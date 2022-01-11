const openGraphScraper = require('open-graph-scraper');
const mongoose = require('mongoose');
// models
const Bookmark = require('../db/models/datadocs/Bookmark');
const Collection = require('../db/models/datadocs/Collection');
// exceptions
const ApiError = require('../exceptions/ApiError');



class BookmarkService {
	// creating new bookmark in db
	static createNewBookmarkInDb = ({ userId, collectionId, data }) => new Promise(async (resolve, reject) => {
		let error = null;
		let result = null;
		
		try {
			// establishing mongoose session
			const session = await mongoose.startSession();
			// starting transaction
			await session.startTransaction();

			try {
				// creating bookmark instance
				const bookmark = new Bookmark({
					userId, collectionId, data
				});

				// saving bookmark in session
				await bookmark.save({ session });
				
				// finding associated collection
				const collectionDoc = await Collection.findById(collectionId).session(session);

				// if collection is not found throw error
				if(!collectionDoc) {
					throw ApiError.BadRequest('Collection with provided id does not exist');
				}

				// updating bookmarks count
				collectionDoc.bookmarksCount++;
				// saving collection in session 
				// by default save is associated with the session used in findById method
				await collectionDoc.save();

				// ensuring all requests are successful and committing transaction
				await session.commitTransaction();

				// setting result to created bookmark
				result = bookmark;
			}
			catch(err) {
				// aborting transaction
				await session.abortTransaction();
				// setting error
				error = err;
			}
			finally {
				// ending session
				await session.endSession();
			}
		}
		catch(err) {
			// setting error
			error = err;
		}
		finally {
			// if error occured
			if(error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		}
	});


	// slicing provided og data to required for db format, static private method 
	static #processOpenGraphDataToRequiredFormat = (data) => {
		// creating URL instance in order to extract domain name
		const domain = (new URL(data.requestUrl)).hostname.replace('www.', '');

		// formating data
		const formatedData = {
			link: data.ogUrl || data.requestUrl,
			title: data.ogTitle || data.requestUrl, // in case og title does not exist use url instead 
			domain,
			description: data.ogDescription || '',
			imgSrc: data.ogImage?.url || '',
			favicon: data.favicon || '',
		};

		return formatedData;
	};

	// extracting og data using provided resource link
	static extractOpenGraphDataFromResource = url => new Promise((resolve, reject) => {
		const errorMessage = 'Unable to retrieve data from the resource. Link must have the following format: \'https://example.com/\'';
		const options = { url };

		// scraping og data from resource
		openGraphScraper(options)
			.then(({ isError, result }) => {
				// if error occured during scraping or scraping was unsuccessful
				if(isError || !result?.success) {
					return reject(ApiError.BadRequest(errorMessage));
				}

				// retrieving required fields from og data
				const formatedData = BookmarkService.#processOpenGraphDataToRequiredFormat(result);

				// resolving with formated result
				resolve(formatedData);
			})
			.catch(err => reject(ApiError.BadRequest(errorMessage)));
	});


	// deleting bookmark by id and decrementing bookmarks count of associated collection
	static deleteBookmarkById = bookmarkId => new Promise(async (resolve, reject) => {
		let error = null;
		let result = null;

		try {
			// establishing mongoose session
			const session = await mongoose.startSession();
			// starting transaction
			await session.startTransaction();

			try {
				// finding and deleting doc in db through session
				const bookmark = await Bookmark.findByIdAndDelete(bookmarkId).session(session);

				// if bookmark is not found
				if(!bookmark) {
					throw ApiError.BadRequest('Bookmark with provided id does not exist');
				}
				
				// retrieving collection id from deleted bookmark
				const collectionId = bookmark.collectionId;

				// if bookmark is not from unsorted collection, in other words its collection id is not null
				if(collectionId !== null) {
					// finding associated collection
					const collection = await Collection.findById(collectionId).session(session);

					// if collection not found
					if(!collection) {
						throw ApiError.BadRequest('Collection associated with the bookmark does not exist. Unable to delete bookmark.');
					}

					// decrementing bookmarks count
					collection.bookmarksCount--;

					// saving collection in session 
					// by default save is associated with the session used in findById method
					await collection.save();
				}

				// ensuring all requests are successful and committing transaction
				await session.commitTransaction();

				// setting result to deleted bookmark
				result = bookmark;
			}
			catch(err) {
				// aborting transaction
				await session.abortTransaction();
				// setting error
				error = err;
			}
			finally {
				// ending session
				await session.endSession();
			}
		}
		catch(err) {
			// setting error
			error = err;
		}
		finally {
			if(error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		}
	});


	// updating fields of bookmark and omitting undefined values
	static updateBookmarkById = (bookmarkId, data) => new Promise(async (resolve, reject) => {
		let error = null;
		let result = null;

		// constructing updating object
		const updatingFields = {
			collectionId: data.collectionId,
			'data.title': data.title,
			'data.description': data.description,
			'data.imgSrc': data.imgSrc,
		};

		try {
			// establishing mongoose session
			const session = await mongoose.startSession();
			// starting transaction
			await session.startTransaction();

			try {
				// saving prvious collection id to update the collections
				const previousCollectionId = (await Bookmark.findById(bookmarkId).session(session)).collectionId;


				// options for update mongoose method
				const options = {
					runValidators: true,
					omitUndefined: true,
					new: true
				};
				// updating bookmark through session
				const updatedBookmark = await Bookmark.findByIdAndUpdate(bookmarkId, updatingFields, options).session(session);

				// if collectionId was provided it is required to update bookmark count of the collections
				const providedCollectionId = updatingFields.collectionId;
				
				// if collection id update was provided and previous collection was not null
				if(providedCollectionId !== undefined && previousCollectionId) {
					// decrementing bookmarks count of previous collection
					await Collection.updateOne(
						{ _id: previousCollectionId },
						{ $inc: { bookmarksCount: -1 } },
					).session(session);
				}

				// if collection id changed with another existing collection id
				if(providedCollectionId && providedCollectionId !== previousCollectionId) {
					// incrementing bookmark count for new provided collection
					await Collection.updateOne(
							{ _id: providedCollectionId },
							{ $inc: { bookmarksCount: 1 } },
						).session(session);
				}

				// ensuring all requests are successful and committing transaction
				await session.commitTransaction();

				// if every update succeeded then set result to bookmark
				result = updatedBookmark;
			}
			catch(err) {
				// aborting transaction
				await session.abortTransaction();
				// setting error
				error = err;
			}
			finally {
				// ending session
				await session.endSession();
			}
		}
		catch(err) {
			// setting error
			error = err;
		}
		finally {
			// if error occured
			if(error) {
				reject(error);
			}
			else {
				resolve(result);
			}
		}
	});


	// checking existence of bookmark with provided matching query
	static exists = (query) => new Promise((resolve, reject) => {
		Bookmark.exists(query)
			.then(existence => resolve(existence))
			.catch(err => reject(err));
	});


	// retirieving bookmarks by user id
	static findBookmarksByUserId = (userId) => new Promise((resolve, reject) => {
		Bookmark.find({ userId })
			.then(bookmarks => resolve(bookmarks))
			.catch(err => reject(err));
	}); 

};


module.exports = BookmarkService;
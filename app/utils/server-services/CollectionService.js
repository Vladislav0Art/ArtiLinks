const mongoose = require('mongoose');
// models
const Collection = require('../db/models/datadocs/Collection');
const Bookmark = require('../db/models/datadocs/Bookmark');
// exceptions
const ApiError = require('../exceptions/ApiError');



class CollectionService {
	// creating ans saving new collection in db
	static createNewCollectionInDb = async ({
		userId, groupId, label, icon = ''
	}) => {
		// creating collection instance
		const collection = new Collection({
			userId, groupId, label, icon
		});
		
		// saving to db
		await collection.save();

		return collection;
	};

	// deleting collection from db and setting associated bookmarks as unsorted: collectionId = null
	static deleteCollectionById = (collectionId) => new Promise(async (resolve, reject) => {
		let error = null;
		// object with deleted collection and its modified bookmarks
		let result = null;

		try {
			// establishing mongoose session
			const session = await mongoose.startSession();
			// starting transaction
			await session.startTransaction();

			try {
				// deleting collection with session
				const collection = await Collection.findByIdAndDelete(collectionId).session(session);

				// collection with provided id does not exist
				if(!collection) {
					throw ApiError.BadRequest('Collection with provided id does not exist');
				}

				// saving bookmarks whose collectionId prop will be changed
				const bookmarks = await Bookmark.find({ collectionId }).session(session);

				// setting collectionId of bookmarks to null
				bookmarks.forEach((bookmark, index, array) => {
					bookmark.collectionId = null;
					array[index] = bookmark;
				});

				// updating collectionId prop of all bookmarks associated with deleted collection
				await Bookmark.updateMany({ collectionId }, { collectionId: null }).session(session);

				// ensuring all requests are successful and committing transaction
				await session.commitTransaction();

				// setting result to modified data
				result = {
					collection, bookmarks
				};
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


	// deleting collections by group id
	static deleteCollectionsByGroupId = groupId => new Promise((resolve, reject) => {
		// sorting collections by group id and deleting them in db 
		Collection.deleteMany({ groupId })
			.then(deletedCount => resolve(deletedCount))
			.catch(err => reject(err));
	});

	
	// deleting empty collection (which contains 0 bookmarks) by group id
	static deleteEmptyCollectionsByGroupId = groupId => new Promise((resolve, reject) => {
		// deleting collection with provided group id and with 0 bookmarks count
		Collection.deleteMany({ groupId, bookmarksCount: 0 })
			.then(deletedCount => resolve(deletedCount))
			.catch(err => reject(err));
	}); 


	// updating collection by id and omitting undefined values
	static updateCollectionById = (collectionId, updateOptions) => new Promise((resolve, reject) => {
		// searching collection by id and updating in db
		Collection.findByIdAndUpdate(collectionId, updateOptions, {
			runValidators: true,
			omitUndefined: true,
			useFindAndModify: false,
			new: true,
		})
			.then(collection => resolve(collection))
			.catch(err => reject(err));
	});


	// checking existence of collection with provided matching query
	static exists = (query) => new Promise((resolve, reject) => {
		Collection.exists(query)
			.then(existence => resolve(existence))
			.catch(err => reject(err));
	});


	// retrieving collections by user id
	static findCollectionsByUserId = (userId) => new Promise((resolve, reject) => {
		Collection.find({ userId })
			.then(collections => resolve(collections))
			.catch(err => reject(err));
	});
};

module.exports = CollectionService;
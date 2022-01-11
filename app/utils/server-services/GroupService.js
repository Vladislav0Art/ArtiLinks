const mongoose = require('mongoose');
// models
const Group = require('../db/models/datadocs/Group');
const Collection = require('../db/models/datadocs/Collection');
const Bookmark = require('../db/models/datadocs/Bookmark');
// exeptions
const ApiError = require('../exceptions/ApiError');


class GroupService {
	// creating and saving in db group with provided label and user id
	static createNewGroupInDb = async (label, userId) => {
		// cerating group
		const group = new Group({ userId, label });
		// saving in db
		await group.save();

		return group;
	};

	// retrieving groups by user id
	static findGroupsByUserId = (userId) => new Promise((resolve, reject) => {
		Group.find({ userId })
			.then(groups => resolve(groups))
			.catch(err => reject(err));
	});


	// updating group by id
	static updateGroupById = (groupId, updateOptions) => new Promise((resolve, reject) => {
		// updating fields by id
		Group.findByIdAndUpdate(groupId, updateOptions, {
			runValidators: true,
			omitUndefined: true,
			new: true,
		})
			.then(group => resolve(group))
			.catch(err => reject(err));
	});

	// removing group from db (this action should invoke deletion of associated collections and bookmarks)
	static deleteGroupById = (groupId) => new Promise(async (resolve, reject) => {
		let error = null;
		// object with deleted group, collections and bookmarks
		let result = null;
		
		try {
			// establishing mongoose session
			const session = await mongoose.startSession();
			// starting transaction
			await session.startTransaction();

			try {
				// finding and deleting group by groupId with session 
				const group = await Group.findByIdAndDelete(groupId).session(session);

				// group with provided id does not exist
				if(!group) {
					throw ApiError.BadRequest('Group with provided id does not exist');
				}

				// saving before deletion all collections that are associated with provided group
				const collections = await Collection.find({ groupId }).session(session);

				// deleting collections that are associated with provided group
				await Collection.deleteMany({ groupId }).session(session);

				// array for storing delted bookmarks
				let bookmarks = [];

				// for each collection saaving its bookmarks and deleting them in session
				for(const collection of collections) {
					// searching for bookmarks of collection and saving them
					const foundBookmarks = await Bookmark.find({ collectionId: collection._id }).session(session);
					// merging bookmarks
					bookmarks = [...bookmarks, ...foundBookmarks];
					// deleting bookmarks with current collection id with session
					await Bookmark.deleteMany({ collectionId: collection._id }).session(session);
				}

				// ensuring all requests are successful and committing transaction
				await session.commitTransaction();

				// setting result to deleted data
				result = {
					group, collections, bookmarks
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
};


module.exports = GroupService;
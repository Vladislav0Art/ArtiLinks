import React from 'react';
// utils
import db from '../../app/utils/db/database';
// server services
import GroupService from '../../app/utils/server-services/GroupService';
import CollectionService from '../../app/utils/server-services/CollectionService';
import BookmarkService from '../../app/utils/server-services/BookmarkService';
// template
import { Dashboard } from '../../app/components/templates';
// hooks
// import { useAuth } from '../../app/hooks';
// providers
import { UserProvider, DataProvider } from '../../app/providers'
// higher-order-functions
import { requireAuthentication } from '../../app/higher-order-functions';
// utils/routes
import { LOGIN_PAGE } from '../../app/utils/routes/pages';
// utils/routes/helpers
// import { redirect } from '../../app/utils/routes/helpers';



const DashboardPage = ({ 
	user,
	groups,
	collections,
	bookmarks,
	error
 }) => {
	
	// const { logout } = useAuth();

	/*
	// setting user instance to context at first render
	// useEffect(() => {
	// 	// setting user in global context
	// 	updateUser(user);
	// }, []);
	

	// logs out user and redirects to login page
	const logoutUser = async () => {
		try {
			await logout();
			// redirect user to provided path
			redirect(LOGIN_PAGE);
		}
		catch(err) {
			console.error(err?.response?.data);
		}
	}
	*/

	return (
		<UserProvider user={user}>
			<DataProvider data={{
				groups,
				collections,
				bookmarks,
			}}>
				<Dashboard />
			</DataProvider>
		</UserProvider>
	);
};


// if user is not authenticated redirects to login page
export const getServerSideProps = requireAuthentication(async ({ user }) => {
	// fetching user's groups, collecitions, bookmarks
	let error = null;
	let groups = null;
	let collections = null;
	let bookmarks = null;

	try {
		// connecting to db
		await db.connectToDb();

		const userId = user.id;

		// stringifying and parsing are required because NextJS allows only serializable types to be passed as props
		groups = JSON.parse(JSON.stringify(await GroupService.findGroupsByUserId(userId)));
		collections = JSON.parse(JSON.stringify(await CollectionService.findCollectionsByUserId(userId)));
		bookmarks = JSON.parse(JSON.stringify(await BookmarkService.findBookmarksByUserId(userId)));
	}
	catch(err) {
		console.error(err);
		error = {
			message: err.message,
			name: err.name
		};
		error = JSON.parse(JSON.stringify(error));
	}
	finally {
		return {
			props: {
				user,
				groups,
				collections, 
				bookmarks,
				error
			}
		};
	}
}, { redirectTo: LOGIN_PAGE });


export default DashboardPage;
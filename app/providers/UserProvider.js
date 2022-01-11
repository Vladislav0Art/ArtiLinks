import { useState } from 'react';
import PropTypes from 'prop-types';
// contexts
import { UserContext } from '../contexts';


const UserProvider = ({ children, user }) => {
	// initial user state
	const initialUserDataState = {
		id: user?.id,
		avatar: user?.data.avatar,
		email: user?.data.email,
		firstName: user?.data.firstName,
		lastName: user?.data.lastName,
		isEmailConfirmed: user?.isEmailConfirmed,
		createdAt: user?.createdAt,
		updatedAt: user?.updatedAt,
	};

	// initial sort mode state
	const initialSortModeState = {
		isAscendingOrder: user?.sortMode.isAscendingOrder,
		sortByDate: user?.sortMode.sortByDate,
		sortByName: user?.sortMode.sortByName,
	};

	// initial toolbar state
	const initialToolbarState = {
		isOpened: user?.toolbar.isOpened,
		width: user?.toolbar.width,
	};

	// initial view state
	const initialViewState = {
		isVisible: user?.view.isVisible,
		mode: user?.view.mode,
	};
	
	const [userData, setUser] = useState(initialUserDataState);
	const [sortMode, setSortMode] = useState(initialSortModeState);
	const [toolbar, setToolbar] = useState(initialToolbarState);
	const [view, setView] = useState(initialViewState);

	const [isLoading, setIsLoading] = useState(false);

	// user functions:

	// updating user with provided data
	const updateUser = (data) => {
		setUser(prevState => ({
			...prevState,
			...data,
		}));
	};


	// sort mode functions:


	// toolbar functions:

	// toggling opened state of toolbar
	const toggleToolbar = () => setToolbar(prevState => ({ ...prevState, isOpened: !prevState.isOpened }));

	// changing width of toolbar
	const changeToolbarWidth = (width) => setToolbar(prevState => ({ ...prevState, width }));


	// user data context value
	const contextValue = {
		user: userData,
		sortMode,
		toolbar,
		view,
		isLoading,

		// user
		updateUser,

		// toolbar
		toggleToolbar,
		changeToolbarWidth,
	};

	return <UserContext.Provider value={contextValue}>{ children }</UserContext.Provider>;
};


// prop types
const requiredString = PropTypes.string.isRequired;
const requiredBool = PropTypes.bool.isRequired;

UserProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	user: PropTypes.shape({
		id: requiredString,
		data: PropTypes.shape({
			avatar: requiredString,
			email: requiredString,
			firstName: requiredString,
			lastName: requiredString,
		}).isRequired,
		isEmailConfirmed: requiredBool,
		createdAt: requiredString,
		updatedAt: requiredString,
		toolbar: PropTypes.shape({
			width: PropTypes.number.isRequired,
			isOpened: requiredBool,
		}).isRequired,
		view: PropTypes.shape({
			isVisible: PropTypes.shape({
				icon: requiredBool,
				title: requiredBool,
				description: requiredBool,
				bookmarkInfo: requiredBool,
			}).isRequired,
			mode: PropTypes.oneOf(['list', 'card', 'headline']),
		}).isRequired,
		sortMode: PropTypes.shape({
			sortByDate: requiredBool,
			sortByName: requiredBool,
			isAscendingOrder: requiredBool,
		}).isRequired,
	}).isRequired,
};


export default UserProvider;
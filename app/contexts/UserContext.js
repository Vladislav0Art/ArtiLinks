import { createContext } from "react";

// user data context
const UserContext = createContext({
	user: {},
	sortMode: {},
	toolbar: {},
	view: {},
	isLoading: false,
	
	// user
	updateUser: () => {},

	// toolbar
	toggleToolbar: () => {},
	changeToolbarWidth: () => {},
});

export default UserContext;
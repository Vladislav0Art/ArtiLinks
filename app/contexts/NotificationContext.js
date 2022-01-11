import { createContext } from "react";

// global notification context
const NotificationContext = createContext({
	notification: {
		title: null,
		message: null,
		type: null, // error, info, warning
		isNotification: false
	},
	
	addErrorNotification: () => {},
	addWarningNotification: () => {},
	addInfoNotification: () => {},
	removeNotification: () => {},
	onConfirm: () => {},
});

export default NotificationContext;
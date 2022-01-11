import { useContext } from 'react';
// contexts
import { NotificationContext } from '../contexts';

const useNotification = () => {
	return useContext(NotificationContext);
};


export default useNotification;
import { useContext } from 'react';
// contexts
import { UserContext } from '../contexts';

const useUser = () => {
	return useContext(UserContext);
};


export default useUser;
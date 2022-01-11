import { useContext } from 'react';
// contexts
import { DataContext } from '../contexts';

const useData = () => {
	return useContext(DataContext);
};


export default useData;
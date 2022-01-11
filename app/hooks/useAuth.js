import { useContext } from "react";
// contexts
import { AuthContext } from '../contexts';

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
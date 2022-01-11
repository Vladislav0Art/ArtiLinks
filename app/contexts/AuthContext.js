import { createContext } from 'react';

// auth context
const AuthContext = createContext({
  // user: null,
  // isLoading: false,
  // isAuthorized: false,
  
  login: () => {},
  register: () => {},
  logout: () => {}, 
  // checkAuth: () => {},

});

export default AuthContext;
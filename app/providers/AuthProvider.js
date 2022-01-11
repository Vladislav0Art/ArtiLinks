import PropTypes from 'prop-types';
// contexts
import { AuthContext } from '../contexts';
// hooks
import { useProvideAuth } from '../hooks';


// Provider component that wraps your app and makes auth object
// available to any child component that calls useAuth()
const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>;
};


// prop types
AuthProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
};


export default AuthProvider;
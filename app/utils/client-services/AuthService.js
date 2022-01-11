import $api from '../../http';
// utils/routes
import { 
	LOGIN_API_URL, 
	REGISTER_API_URL,
	LOGOUT_API_URL
} from '../routes/api';


class AuthService {

	// sends login request to api
  static login = async (formData) => {
    return $api.post(LOGIN_API_URL, formData);
  };

	// sends register request to api 
	static register = async (formData) => {
		return $api.post(REGISTER_API_URL, formData);
	};

	// sends logout request to api
	static logout = async () => {
		return $api.post(LOGOUT_API_URL);
	};

};


export default AuthService;
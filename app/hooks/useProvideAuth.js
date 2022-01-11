import { useState } from "react";
// utils
import AuthService from "../utils/client-services/AuthService";




// sets access token to local storage
const setAccessTokenToLocalStorage = (token) => {
	localStorage.setItem('access-token', token);
};


const useProvideAuth = () => {
	// const [isLoading, setIsLoading] = useState(false);
	// const [user, setUser] = useState(null);
	// const [isAuthorized, setIsAuthorized] = useState(false);

	// login user
	const login = (formData) => new Promise(async (resolve, reject) => {
		try {
			// creating request
			const response = await AuthService.login(formData);
			console.log(response);

			// setting access token in local storage
			setAccessTokenToLocalStorage(response.data.accessToken);

			// setting authorization and user
			// setIsAuthorized(true);
			// setUser(response.data.user);
			
			resolve();
		}
		catch(err) {
			reject(err);
		}
	});


	// register user
	const register = (formData) => new Promise(async (resolve, reject) => {
		try {
			const response = await AuthService.register(formData);
			console.log(response);

			// setting access token in local storage
			setAccessTokenToLocalStorage(response.data.accessToken);
			
			// setting authorization and user
			// setIsAuthorized(true);
			// setUser(response.data.user);

			resolve();
		}
		catch(err) {
			reject(err);
		}
	});



	// logout user
	const logout = async () => new Promise(async (resolve, reject) => {
		try {
			const response = await AuthService.logout();
			console.log(response);
			
			// removing access token from local storage
			localStorage.removeItem('access-token');
			
			// unauthorizing and removing user
			// setIsAuthorized(false);
			// setUser(null);

			resolve();
		}
		catch(err) {
			reject(err);
		}
	});



  // checking expiration of refresh token
  /* 
  const checkAuth = async () => new Promise(async (resolve, reject) => {
    setIsLoading(true);

    let error = null;

    try {
      // sending request for refreshing tokens
      const response = await axios.get(REFRESH_API_URL, { withCredentials: true });

      // if refresh token is valid set it to local storage
      setAccessTokenToLocalStorage(response.data.accessToken);

      // setting authorization and user
      setIsAuthorized(true);
      setUser(response.data.user);
    }
    catch(err) {
      error = err;
    }
    finally {
      setIsLoading(false);
      if(error) reject(error);
      else resolve();
    }
  });
  */

	return {
		// isLoading, user, isAuthorized,
		login, register, logout, // checkAuth
	};
};

export default useProvideAuth;
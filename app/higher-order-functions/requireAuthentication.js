import axios from 'axios';
// utils
const TokenService = require('../utils/server-services/TokenService');
// utils/routes
import { REFRESH_API_URL } from '../utils/routes/api';



// runs as middleware for getServerSideProps function, sets user in context
export function requireAuthentication(getServerSideProps, { redirectTo }) {
	return async (context) => {
		try {
			const { req, res } = context;

			// sending request for refreshing tokens
			const response = await axios.get(REFRESH_API_URL, {
				withCredentials: true,
				headers: {
					// if req.headers.cookie is 'undefined' value of 'null' will be set 
					// (undefined cannot be set as cookie)
					Cookie: req.headers.cookie ?? null
				}
			});

			// setting refresh token from API to res
			const refreshToken = response.data.refreshToken;
			TokenService.setRefreshTokenInHttpOnlyCookies(req, res, refreshToken);

			// retrieving user from response
			const user = response.data.user;
			return await getServerSideProps({ ...context, user }); // continue on to call `getServerSideProps` logic
		}
		catch(err) {
			console.log(err?.response?.data);
					
			return {
				redirect: {
					destination: redirectTo,
					permanent: false,
				}
			};
		}

	};
};

export default requireAuthentication;
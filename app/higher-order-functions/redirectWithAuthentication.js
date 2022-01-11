import Cookies from 'cookies';
// db
const db = require('../utils/db/database');
// utils
const TokenService = require('../utils/server-services/TokenService');


// if refresh token is valid redirects to passed redirect path
export function redirectWithAuthentication(getServerSideProps, { redirectTo }) {
	return async (context) => {
		const { req, res } = context;

		// retrieving refresh token 
		const cookies = new Cookies(req, res);
		const refreshToken = cookies.get('refreshToken');

		// flag for redirection
		let needToRedirect = false;

		try {
			// if refresh token is valid and exists in db redirect
			if(TokenService.validateRefreshToken(refreshToken)) {
				// connecting to db
				await db.connectToDb();
				// if reshresh token exists in db redirect
				if(await TokenService.refreshTokenExists(refreshToken)) {
					// setting redirect to true
					needToRedirect = true;
				}
			}
		}
		catch(err) {
			console.error(err);
		}
		finally {
			// if reshresh token is valid and exists in db
			if(needToRedirect) {
				return {
					redirect: {
						destination: redirectTo,
						permanent: false,
					}
				};
			}
			// if refresh token is invalid or error occured
			return await getServerSideProps({ ...context });
		}
	};
};



export default redirectWithAuthentication;
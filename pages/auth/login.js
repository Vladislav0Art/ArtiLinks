import React from 'react';
// templates
import { Login } from '../../app/components/templates';
// hooks
import { useAuth, useNotification } from '../../app/hooks';
// higher-order-functions
import { redirectWithAuthentication } from '../../app/higher-order-functions';
// utils/routes
import { DASHBOARD_PAGE } from '../../app/utils/routes/pages';
// utils/routes/helpers
import { redirect } from '../../app/utils/routes/helpers';


const LoginPage = () => {
	const { login } = useAuth();
	const { addErrorNotification } = useNotification();

	// login user and redirect to dashboard
	const loginUserAndRedirectToDashboard = async (formData) => {
		try {
			await login(formData);
			// redirecting to dashboard
			redirect(DASHBOARD_PAGE);
		}
		catch(err) {
			const errorMessageData = err?.response?.data;
			console.error(errorMessageData);
			console.error(err);
			console.dir(err);
			// adding error to global error state
			addErrorNotification(errorMessageData);
		}
	};


	return (
		<Login onSubmit={loginUserAndRedirectToDashboard} />
	);
};

// if user is authenticated redirects to /dashboard
export const getServerSideProps = redirectWithAuthentication(() => {
	return { props: {} };
}, { redirectTo: DASHBOARD_PAGE });


export default LoginPage;
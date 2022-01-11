import React from 'react';
// templates
import { Registration } from '../../app/components/templates';
// hooks
import { useAuth, useNotification } from '../../app/hooks';
// higher-order-functions
import { redirectWithAuthentication } from '../../app/higher-order-functions';
// utils/routes
import { DASHBOARD_PAGE } from '../../app/utils/routes/pages';
import { redirect } from '../../app/utils/routes/helpers';



const RegisterPage = () => {  
	const { register } = useAuth();
	const { addErrorNotification } = useNotification();

	const registerUserAndRedirectToDashboard = async (formData) => {
	try {
		await register(formData);
		// redirecting to dashboard
		redirect(DASHBOARD_PAGE);
	}
	catch(err) {
		const errorMessageData = err?.response?.data;
		console.error(errorMessageData);
		// adding error to global error state
		addErrorNotification(errorMessageData);
	}
	};

	return (
		<Registration onSubmit={registerUserAndRedirectToDashboard} />
	);
};


// if user is authenticated redirects to /dashboard
export const getServerSideProps = redirectWithAuthentication(() => {
  return { props: {} };
}, { redirectTo: DASHBOARD_PAGE });



export default RegisterPage;
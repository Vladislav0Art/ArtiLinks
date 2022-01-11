import React from 'react';
import { useRouter } from 'next/router';
// hooks
import { useNotification } from '../../../app/hooks';
// templates
import { RecoveryChangePassword } from '../../../app/components/templates';
// utils
import RecoveryService from '../../../app/utils/client-services/RecoveryService';
// utils/routes
import { LOGIN_PAGE } from '../../../app/utils/routes/pages';
// utils/routes/helpers
import { redirect } from '../../../app/utils/routes/helpers';


const RecoveryPage = () => {
	const router = useRouter();

	const { uid } = router.query;
	const { addErrorNotification } = useNotification();
	

	// updating user's password in db
	const updateUserPassword = async (formData) => {
	try {
		const response = await RecoveryService.updatePassword(formData, uid);
		console.log(response);
		
		// redirecting to login page
		redirect(LOGIN_PAGE);
	}
	catch(err) {
		const errorMessageData = err?.response?.data;
		console.error(errorMessageData);
		// adding error to global error state
		addErrorNotification(errorMessageData);
	}
	};

	return (
		<RecoveryChangePassword onSubmit={updateUserPassword} />
	);
};

export default RecoveryPage;
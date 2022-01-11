import React from 'react';
// hooks
import { useNotification } from '../../../app/hooks';
// templates
import { RecoverySend } from '../../../app/components/templates';
// utils
import RecoveryService from '../../../app/utils/client-services/RecoveryService';


const RecoveryPage = () => {
	const { addErrorNotification } = useNotification();

	// sending password recovery email
	const sendRecoveryEmail = async (formData) => {
	try {
		// sending recovery email to user
		const response = await RecoveryService.sendPasswordRecoveryEmailToUser(formData);
		console.log(response);
	}
	catch(err) {
		const errorMessageData = err?.response?.data;
		console.error(errorMessageData);
		// adding error to global error state
		addErrorNotification(errorMessageData);
	}
	};

	return (
		<RecoverySend onSubmit={sendRecoveryEmail} />
	);
};

export default RecoveryPage;
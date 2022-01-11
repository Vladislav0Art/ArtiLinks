import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm } from '../../modules';
// elements
import { DataFormInput } from '../../elements';


const AddGroupModal = ({ isVisible, toggleVisibility }) => {
	const initialFormState = {
		label: ''
	};
	
	const { createGroup } = useData();

	// form submit handler 
	const handleSubmit = async (data) => {
		// creating new group in db
		await createGroup(data);
		// toggling modal visibility
		toggleVisibility();
	};

	return (
		<DataForm 
			isVisible={isVisible}
			initialFormState={initialFormState}
			method='POST'
			onSubmit={handleSubmit}
			onCancel={toggleVisibility}
		>
			<DataFormInput title='Enter group label' placeholder='Group label' name='label' />
		</DataForm>
	);
};


// prop types
AddGroupModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
};


export default AddGroupModal;

import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm } from '../../modules';
// elements
import { DataFormInput } from '../../elements';



const RenameGroupModal = ({
	group,
	isVisible,
	toggleVisibility,
}) => {
	// retrieving data from group
	const { _id: groupId, label } = group;
	const initialFormState = { label };
	
	const { updateGroup } = useData();
	
	// handling form submition
	const handleSubmit = async (data) => {
		// awaiting response
		await updateGroup({ ...data, groupId });
		// closing modal after successful update
		toggleVisibility();
	};

	return (
		<DataForm
			isVisible={isVisible}
			initialFormState={initialFormState}
			method='PUT'
			onSubmit={handleSubmit}
			onCancel={toggleVisibility}
			resetOnSubmit={false}
		>
			<DataFormInput title='Rename group' placeholder='New group label' name='label' />
		</DataForm>
	);
};


// prop types
RenameGroupModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	group: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
	toggleVisibility: PropTypes.func.isRequired,
};


export default RenameGroupModal;

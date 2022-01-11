import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm, IconsSelector } from '../../modules';
// elements
import { DataFormInput } from '../../elements';



const AddCollectionModal = ({
	groupId,
	isVisible,
	toggleVisibility
}) => {
	const initialFormState = {
		icon: {
			id: null,
			src: null
		},
		label: ''
	};
	
	const { createCollection } = useData();

	// form submit handler
	const handleSubmit = async (data) => {
		// awaiting response
		await createCollection({
			icon: data.icon.src,
			label: data.label,
			groupId
		});
		// closing modal
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
			<DataFormInput title='Enter collection label' placeholder='Collection label' name='label' />
			<IconsSelector title='Choose an icon' />
		</DataForm>
	);
};


// prop types
AddCollectionModal.propTypes = {
	groupId: PropTypes.string.isRequired,
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
};


export default AddCollectionModal;

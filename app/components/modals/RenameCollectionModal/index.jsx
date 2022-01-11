import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm } from '../../modules';
// elements
import { DataFormInput } from '../../elements';



const RenameCollectionModal = ({
	isVisible,
	toggleVisibility,
	collection
}) => {
	const initialFormState = { label: collection.label };
	
	const { updateCollection } = useData();


	// handling submit request
	const handleSubmit = async (data) => {
		// sending api request
		await updateCollection({
			collectionId: collection._id,
			...data,
		});
		// closing modal
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
			<DataFormInput title='Rename collection' placeholder='New collection label' name='label' />
		</DataForm>
	);
};


// prop types
RenameCollectionModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
	collection: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		label: PropTypes.string.isRequired,
	}).isRequired,
};


export default RenameCollectionModal;

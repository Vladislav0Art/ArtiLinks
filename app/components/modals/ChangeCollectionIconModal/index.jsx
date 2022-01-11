import React from 'react';
import PropTypes from 'prop-types';
// modules
import { DataForm, IconsSelector } from '../../modules';
// hooks
import { useData } from '../../../hooks';



const ChangeCollectionIconModal = ({
	isVisible,
	toggleVisibility,
	collectionId,
}) => {
	const initialFormState = { 
		icon: {
			id:  null,
			src: null
		}
	};
	
	const { updateCollection } = useData();


	// sending api update request
	const handleSubmit = async (data) => {
		// awaiting api response
		await updateCollection({
			collectionId,
			icon: data?.icon?.src
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
		>
			<IconsSelector title="Choose an icon" />
		</DataForm>
	);
};



// prop types
ChangeCollectionIconModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
	collectionId: PropTypes.string.isRequired,
};


export default ChangeCollectionIconModal;

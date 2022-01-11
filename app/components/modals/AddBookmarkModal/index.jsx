import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm } from '../../modules';
// elements
import { DataFormInput } from '../../elements';



const AddBookmarkModal = ({ 
	isVisible,
	toggleVisibility
}) => {
	const initialFormState = {
		link: ''
	};

	const { viewedCollection, createBookmark } = useData();

	// creating bookmark and closing modal
	const handleSubmit = async (data) => {
		// creating bookmark
		await createBookmark({
			collectionId: viewedCollection._id,
			...data,
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
			<DataFormInput title='Enter URL' placeholder='https://' name='link' />
		</DataForm>
	);
};


// prop types
AddBookmarkModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
};


export default AddBookmarkModal;

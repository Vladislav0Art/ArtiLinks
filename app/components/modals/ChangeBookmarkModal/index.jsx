import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// elements
import { DataFormInput, DataFormTextArea } from '../../elements';
// modules
import { DataForm, CollectionSelect } from '../../modules';
// defaults
import { unsortedCollection } from '../../../utils/defaults/default-collections';
// styles
import styles from './styles.module.scss';


const ChangeBookmarkModal = ({ 
	isVisible, 
	bookmark,
	toggleVisibility,
}) => {
	const initialFormState = {
		selectedCollectionId: bookmark?.collectionId,
		title: bookmark?.data?.title,
		description: bookmark?.data?.description
	};

	const { updateBookmark } = useData();

	// submitting update request
	const handleSubmit = async (data) => {
		const submitData = {
			bookmarkId: bookmark._id,
			collectionId: data.selectedCollectionId === unsortedCollection._id ? null : data.selectedCollectionId,
			title: data.title,
			description: data.description,
		};
		// updating bookmark
		await updateBookmark(submitData);
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

			<div className={styles.container}>
				<DataFormInput
					title='Change title'
					placeholder='Enter bookmark title'
					name='title'
					classNames={[styles.input]}
				/>
				<DataFormTextArea
					title='Change description'
					placeholder='Enter bookmark description'
					name='description'
				/>
				<CollectionSelect />
			</div>
		</DataForm>
	);
};


// prop types
const nullableString = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.oneOf([null])
]);
const requiredString = PropTypes.string.isRequired;

ChangeBookmarkModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	bookmark: PropTypes.shape({
		data: PropTypes.shape({
			title: requiredString, 
			description: nullableString
		}).isRequired,
		collectionId: nullableString,
	}).isRequired,
	toggleVisibility: PropTypes.func.isRequired,
};


export default ChangeBookmarkModal;

import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// modules
import { DataForm, Select } from '../../modules';
// styles 
import styles from './styles.module.scss';


const ChangeGroupModal = ({ 
	isVisible,
	toggleVisibility,
	collection,
	groups
}) => {
	const initialFormState = {
		option: groups.find(group => group._id === collection.groupId)
	};

	const { updateCollectionGroupId } = useData();

	// delaying function
	const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	// this function is required to close modal before state update
	// because after state update the modal unmounts and memory leak occur
	const handleVisibility = () => new Promise(async (resolve) => {
		await toggleVisibility();
		await delay(300);
		resolve();
	});

	// submitting group of collection update request
	const handleSubmit = async (data) => {
		// sending api request
		await updateCollectionGroupId({
			collectionId: collection._id,
			groupId: data.option._id,
		}, handleVisibility);
	}; 

	return (
		<DataForm
		isVisible={isVisible}
		initialFormState={initialFormState}
		method='PUT'
		onSubmit={handleSubmit}
		onCancel={toggleVisibility}
		>
			<div className={styles.content}>
				<span>Select new group</span>
				<Select options={groups} />
			</div>
		</DataForm>
	);
};

// prop types
const optionShape = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
});

ChangeGroupModal.propTypes = {
	isVisible: PropTypes.bool.isRequired,
	toggleVisibility: PropTypes.func.isRequired,
	collection: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		groupId: PropTypes.string.isRequired,
	}).isRequired,
	groups: PropTypes.arrayOf(optionShape).isRequired,
};

export default ChangeGroupModal;

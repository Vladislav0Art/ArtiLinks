import React, { useState } from 'react';
import PropTypes from 'prop-types';
// elements
import { Button } from '../../elements';
// modules
import { Modal } from '../../modules';
// hooks
import { useNotification } from '../../../hooks';
// context
import { FormContext } from '../../../contexts';
// styles
import styles from './styles.module.scss';




const DataForm = ({
	children,
	isVisible,
	resetOnSubmit,
	initialFormState,
	method,
	onSubmit,
	onCancel,
}) => {
	// state of the form
	const [form, setForm] = useState(initialFormState);

	const { addErrorNotification } = useNotification();

	// changing input values in state of form 
	const handleFormInputChange = (event) => {
		const { name, value } = event.target;

		setForm(prevState => ({
			...prevState,
			[name]: value
		}));
	};


	// setting selected icon to form state
	const handleIconSelect = (icon) => setForm(prevState => ({ ...prevState, icon }));


	// setting selected option to form state
	const handleOptionSelect = (option) => setForm(prevState => ({ ...prevState, option }));


	// setting selected collection of bookmark
	const handleCollectionSelect = (selectedCollectionId) => {
		setForm(prevState => ({ ...prevState, selectedCollectionId }));
	};


	// preventing default behavior and submitting form data
	const handleSubmit = async (event) => {
		event.preventDefault();
		
		try {
			// awaiting result of submitting
			await onSubmit(form);

			// if resetting is on
			if(resetOnSubmit) {
				// setting form to default state
				setForm(initialFormState);
			}
		}
		catch(err) {
			// adding error notification
			addErrorNotification({
				message: err.message
			});
			console.error(err);
		}
	};

	// setting form state to default and calling onCancel callback
	const handleCancel = () => {
		// setting form to default state
		setForm(initialFormState);
		// calling onCancel callback
		onCancel();
	};

	return (
		<Modal isModalVisible={isVisible}>
			<form method={method} className={styles.form}>
				<div className={styles.content}>
					<FormContext.Provider value={{
						form,
						handleFormInputChange,
						handleIconSelect,
						handleOptionSelect,
						handleCollectionSelect,
					}}>
						{ children }
					</FormContext.Provider>
				</div>

				<div className={styles.buttons}>
					<Button type='submit' modification='small' onClick={handleSubmit}>Apply</Button>
					<Button dark modification='small' onClick={handleCancel}>Cancel</Button>
				</div>
			</form>
		</Modal>
	);
};


// default props
DataForm.defaultProps = {
	resetOnSubmit: true,
};


// prop types
DataForm.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	isVisible: PropTypes.bool.isRequired,
	resetOnSubmit: PropTypes.bool.isRequired,
	initialFormState: PropTypes.object.isRequired,
	method: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
};


export default DataForm;

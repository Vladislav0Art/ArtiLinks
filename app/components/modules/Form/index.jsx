import React, { useState } from 'react';
import PropTypes from 'prop-types'; 
// styles
import styles from './styles.module.scss';
// elements
import { Button } from "../../elements";
// contexts
import { FormContext } from '../../../contexts';



const Form = ({
	children,
	submit,
	initialFormState,
	method
}) => {

	// state of the form
	const [form, setForm] = useState(initialFormState);


	// changing input values in state of form 
	const handleFormInputChange = (event) => {
		const { name, value } = event.target;

		setForm({
			...form,
			[name]: value
		});
	};


	// preventing default behavior and submitting form data
	const handleSubmit = async (event) => {
		event.preventDefault();
		await submit(form);
	};

  
  return (
    <form method={method}>
			<div className={styles.content}>
				<FormContext.Provider value={{
					form,
					handleFormInputChange
				}}>
					{ children }
				</FormContext.Provider>
			
				
				<Button
					type="submit"
					modification="huge"
					onClick={handleSubmit}>Submit</Button>
			</div>
    </form>
  );
};


// default props
Form.defaultProps = {
	submit: () => {},
	initialFormState: {},
	method: 'POST',
};


// prop types
Form.propTypes = {
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
	submit: PropTypes.func.isRequired,
	initialFormState: PropTypes.object.isRequired,
	method: PropTypes.string.isRequired,
};


export default Form;
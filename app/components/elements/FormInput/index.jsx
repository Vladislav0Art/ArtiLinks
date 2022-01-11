import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// elements
import { Input } from '../../elements';
// styles
import styles from './styles.module.scss';
// contexts
import { FormContext } from '../../../contexts';



const FormInput = ({ 
  placeholder,
  name,
  type,
  classNames: providedClassNames
}) => {
  
  // retriving data from form context
  const formContext = useContext(FormContext);
  const { form, handleFormInputChange } = formContext;

  return (
	<Input
		classNames={[styles.input, ...providedClassNames]}
		type={type}
		placeholder={placeholder}
		name={name}
		value={form[name]}
		onChange={handleFormInputChange}
	/>
  );
};


// default props
FormInput.defaultProps = {
	type: 'text',
	classNames: []
};


// prop types
FormInput.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel']),
	classNames: PropTypes.arrayOf(PropTypes.string),
};


export default FormInput;

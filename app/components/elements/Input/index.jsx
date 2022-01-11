import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// styles
import styles from './styles.module.scss';


const FormInput = ({ 
  placeholder,
  name,
  type,
  value,
  onChange,
  classNames: passedClassNames
}) => {
	// creating classNames object
	const inputClassNames = classNames([styles.input], ...passedClassNames);


	return (
		<input
			className={inputClassNames}
			type={type}
			placeholder={placeholder}
			name={name}
			value={value}
			onChange={onChange}
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

import React from 'react';
import PropTypes from 'prop-types';
// elements
import { FormInput } from '../../elements';
// styles
import styles from './styles.module.scss';



const DataFormInput = ({
	title,
	placeholder,
	name,
	classNames
}) => {
	return (
		<div className={styles.content}>
			<span>{ title }</span>

			<div className={styles.inputContainer}>
				<FormInput 
					placeholder={placeholder}
					name={name}
					classNames={[styles.input, ...classNames]}
				/>
			</div>
		</div>
	);
};


// default props
DataFormInput.defaultProps = {
	placeholder: '',
	classNames: [],
};


// prop types
DataFormInput.propTypes = {
	title: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	classNames: PropTypes.array.isRequired,
};


export default DataFormInput;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// contexts
import { FormContext } from '../../../contexts';
// styles
import styles from './styles.module.scss';

const DataFormTextArea = ({
	title,
	placeholder,
	name,
	classNames: providedClassNames
}) => {
	const { form, handleFormInputChange } = useContext(FormContext);

	return (
		<div className={styles.content}>
			<span>{ title }</span>

			<div className={styles.textareaContainer}>
				<textarea
					placeholder={placeholder}
					name={name}
					value={form[name]}
					className={classNames(styles.textarea, ...providedClassNames)}
					onChange={handleFormInputChange}
				/>
			</div>
		</div>
	);
};


// default props
DataFormTextArea.defaultProps = {
	classNames: [],
	placeholder: '',
};

// prop types
const requiredString = PropTypes.string.isRequired;

DataFormTextArea.propTypes = {
	title: requiredString,
	placeholder: PropTypes.string,
	name: requiredString,
	classNames: PropTypes.array
};


export default DataFormTextArea;

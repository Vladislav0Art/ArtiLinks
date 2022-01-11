import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';



const SelectOption = ({
	value,
	onClick,
	children
}) => {
	return (
		<li
			onClick={() => onClick(value)}
			className={styles.option}
		>
			{ children }
		</li>
	);
};


// prop types
SelectOption.propTypes = {
	value: PropTypes.shape({
		
	}),
	onClick: PropTypes.func.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.node,
		PropTypes.arrayOf(PropTypes.node)
	]).isRequired,
};


export default SelectOption;

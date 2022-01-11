import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';

const Container = ({ children }) => (<div className={styles.container}>{ children }</div>);


// prop types
Container.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Container;

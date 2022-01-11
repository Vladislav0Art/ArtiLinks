import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// styles
import styles from './styles.module.scss';
// images
import arrowIcon from '/public/svg/arrows-resizing.svg';



// child component for Sidebar
const SidebarResizer = ({ isResizing, onResize }) => {
	return (
		<div 
			className={classNames({
				[styles.resizer]: true,
				[styles.resizing]: isResizing,
			})} 
			onMouseDown={onResize} 
			onTouchStart={onResize}
		>
			<img src={arrowIcon.src} alt="Resizing icon" />
		</div>
	);
};

// prop types
SidebarResizer.propTypes = {
	isResizing: PropTypes.bool.isRequired,
	onResize: PropTypes.func.isRequired,
};


export default SidebarResizer;

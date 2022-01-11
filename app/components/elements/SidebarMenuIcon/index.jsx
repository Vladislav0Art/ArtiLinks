import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// styles
import styles from './styles.module.scss';



const SidebarMenuIcon = ({ transitionIn, onClick }) => {
	const menuIconTransitionRef = useRef(null);

	return (
		<CSSTransition
			nodeRef={menuIconTransitionRef}
			in={transitionIn}
			timeout={800}
			classNames={{
				enter: styles.menuIconEnter,
				enterActive: styles.menuIconEnterActive,
				enterDone: styles.menuIconEnterDone,
				exit: styles.menuIconExit,
				exitActive: styles.menuIconExitActive,
				exitDone: styles.menuIconExitDone
			}}
		>
			<div
				ref={menuIconTransitionRef}
				className={styles.menuIcon}
				alt="Menu icon" 
				onClick={onClick}
			/>
		</CSSTransition>
	);
};


// prop types
SidebarMenuIcon.propTypes = {
	transitionIn: PropTypes.bool.isRequired,
	onClick: PropTypes.func.isRequired,
};


export default SidebarMenuIcon;

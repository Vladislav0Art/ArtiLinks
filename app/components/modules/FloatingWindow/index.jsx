import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// styles
import styles from './styles.module.scss';



const FloatingWindow = ({
	children,
	transitionIn
}) => {
	const transitionRef = useRef(null);


	return (
		<CSSTransition
			nodeRef={transitionRef}
			in={transitionIn}
			timeout={250}
			classNames={{
				enter: styles.floatingWindowEnter,
				enterActive: styles.floatingWindowEnterActive,
				enterDone: styles.floatingWindowEnterDone,
				exit: styles.floatingWindowExit,
				exitActive: styles.floatingWindowExitActive,
				exitDone: styles.floatingWindowExitDone,
			}}
			mountOnEnter
			unmountOnExit
		>
			<div ref={transitionRef} className={styles.content}>
				{ children }
			</div>
		</CSSTransition>
	);
};


// prop types
FloatingWindow.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	transitionIn: PropTypes.bool.isRequired,
};


export default FloatingWindow;

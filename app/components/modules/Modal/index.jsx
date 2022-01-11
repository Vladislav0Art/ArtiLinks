import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// styles
import styles from './styles.module.scss';


const Modal = ({ children, isModalVisible = false }) => {
	// reference to DOM node
	const transitionNodeRef = useRef(null);
	
	return (
		<CSSTransition
			// required due to React strict mode throws error without using ref to the transition node
			nodeRef={transitionNodeRef}
			in={isModalVisible}
			timeout={500}
			classNames={{
				enter: styles.wrapperEnter,
				enterActive: styles.wrapperEnterActive,
				enterDone: styles.wrapperEnterDone,
				exit: styles.wrapperExit,
				exitActive: styles.wrapperExitActive,
				exitDone: styles.wrapperExitDone,
			}}
			mountOnEnter // mounting component on enter
			unmountOnExit // unmounting component on exit
		>
			<div ref={transitionNodeRef} className={styles.wrapper}>
				<div className={styles.content}>
					{ children }
				</div>
			</div>
		</CSSTransition>
	);
};


// default props
Modal.defaultProps = {
	isModalVisible: false
};

// prop types
Modal.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
	isModalVisible: PropTypes.bool.isRequired,
};


export default Modal;

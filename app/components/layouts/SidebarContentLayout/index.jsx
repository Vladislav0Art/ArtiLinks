import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
// elements
import { Button } from '../../elements';
// modules
import {
	ProfilePreview, 
	DefaultCollections,
	GroupList
} from '../../modules';
// modals
import { AddGroupModal } from '../../modals';
// styles
import styles from './styles.module.scss';



const SidebarContentLayout = ({ transitionIn }) => {
	const contentSidebarTransitionRef = useRef(null);

	// add group modal visibility
	const [isAddGroupModalVisible, setIsAddGroupModalVisible] = useState(false);

	// toggling add group modal visibility
	const toggleVisibility = () => setIsAddGroupModalVisible(prevState => !prevState);

	return (
		<React.Fragment>
			<CSSTransition
				nodeRef={contentSidebarTransitionRef}
				in={transitionIn}
				timeout={300 + 300} // transition-time + transition-delay
				classNames={{
					enter: styles.contentEnter,
					enterActive: styles.contentEnterActive,
					enterDone: styles.contentEnterDone,
					exit: styles.contentExit,
					exitActive: styles.contentExitActive,
					exitDone: styles.contentExitDone
				}}
			>
				<div
					ref={contentSidebarTransitionRef}
					className={styles.content}
				>
					
					<div className={styles.topPart}>
						<ProfilePreview />
						<DefaultCollections />
					</div>

					<div className={styles.groupButton}>
						<Button onClick={toggleVisibility}>Add new group</Button>
					</div>
					
					<div className={styles.groupList}>
						<GroupList />
					</div>
				</div>
			</CSSTransition>
			
			<AddGroupModal
				isVisible={isAddGroupModalVisible}
				toggleVisibility={toggleVisibility}
			/>
		</React.Fragment>
	);
};


// prop types
SidebarContentLayout.propTypes = {
	transitionIn: PropTypes.bool.isRequired
};


export default SidebarContentLayout;

import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
// hooks
import { useResizable } from '../../../hooks';
// elements
import {
	SidebarResizer,
	SidebarMenuIcon
} from '../../elements';
// layouts
import { SidebarContentLayout } from '../../layouts';
// hooks
import { useUser } from '../../../hooks';
// styles
import styles from './styles.module.scss';



const Sidebar = () => {
	const sidebarRef = useRef(null);
	const sidebarTransitionNodeRef = useRef(null);

	const { toolbar, toggleToolbar } = useUser();

	// this hooks make the sidebar resizable
	const { 
		resizableNodeRef, 
		nodeWidth, 
		isResizing, 
		startResizing
	} = useResizable({ width: toolbar.width });


	// setting sidebar ref to several refs
	useEffect(() => {
		resizableNodeRef.current  = sidebarRef.current;
		sidebarTransitionNodeRef.current = sidebarRef.current;
	}, [sidebarRef.current]);
	

	return (
		<CSSTransition
			nodeRef={sidebarTransitionNodeRef}
			in={!toolbar.isOpened}
			timeout={500 + 100} // transition-time + transition-delay
			classNames={{
				enterActive: styles.sidebarEnterActive,
				enterDone: styles.sidebarEnterDone,
				exit: styles.sidebarExit,
				exitActive: styles.sidebarExitActive,
			}}
		>
			<div 
				ref={sidebarRef}
				className={styles.sidebar}
				style={{ width: nodeWidth }}
				// onMouseDown={event => event.preventDefault()}
			>

				<SidebarMenuIcon transitionIn={!toolbar.isOpened} onClick={toggleToolbar} />

				<SidebarContentLayout transitionIn={!toolbar.isOpened} />

				{ toolbar.isOpened && <SidebarResizer isResizing={isResizing} onResize={startResizing} /> }
			</div>
		</CSSTransition>
	);
};


export default Sidebar;

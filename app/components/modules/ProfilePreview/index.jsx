import React, { useState } from 'react';
// hooks
import { useAuth, useUser } from '../../../hooks';
// modules
import { ProfilePreviewFloatingWindow } from '../../modules';
// utils/routes/helpers
import { redirect } from '../../../utils/routes/helpers';
// routes
import { LOGIN_PAGE } from '../../../utils/routes/pages'; 
// styles
import styles from './styles.module.scss';
// images 
import defaultAvatar from '/public/svg/dashboard/default-avatar.svg';
import caretIcon from '/public/svg/dashboard/caret-down.svg'


const ProfilePreview = () => {
	const { logout } = useAuth();
	const { user } = useUser();

	const [isVisible, setIsVisible] = useState(false);

	// toggling floating window visibility 
	const toggleFloatingWindowVisibility = () => setIsVisible(prevState => !prevState);
	

	// logout user and redirect on login page
	const handleLogout = async () => {
		try {
			// logout user
			await logout();
			// redirecting on login page
			redirect(LOGIN_PAGE);
		}
		catch(err) {
			console.error(err);
		}
	}; 


	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<img 
					className={styles.avatar} 
					width={30} 
					height={30} 
					src={user.avatar ? user.avatar : defaultAvatar.src} 
					alt="Avatar"
				/>
				<span className={styles.username}>
					<span>{ user.firstName }</span>
					<span>{ user.lastName }</span>
				</span>

				<div className={styles.icon}>
					<img
						height={caretIcon.height} 
						width={caretIcon.width} 
						src={caretIcon.src}
						alt="Button icon"
						onClick={toggleFloatingWindowVisibility}
					/>
				</div>
			</div>

			<div className={styles.floatingWindow}>
				<ProfilePreviewFloatingWindow 
					transitionIn={isVisible}
					onSettings={() => alert('Settings coming soon...')}
					onLogout={handleLogout}
				/>
			</div>
		</div>
	);
};


// prop types
ProfilePreview.propTypes = {};


export default ProfilePreview;

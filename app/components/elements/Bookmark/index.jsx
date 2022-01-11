import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// modals
import { ChangeBookmarkModal } from '../../modals';
// styles
import styles from './styles.module.scss';
// images
import defaultBookmarkImage from '/public/svg/dashboard/default-bookmark-image.svg';
import defaultFavicon from '/public/svg/dashboard/default-favicon.svg';



// toolbar icon component
const ToolbarIcon = ({ 
	children,
	onClick
}) => (<span onClick={onClick} className={styles.toolbarIcon}>{children}</span>);


// prop-types
ToolbarIcon.propTypes = {
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
	onClick: PropTypes.func.isRequired,
};



const Bookmark = ({ 
	bookmark, 
	mode,
	onDelete,
}) => {
	const {
		title, 
		description, 
		domain,  
		link, 
		imgSrc,
		favicon,
	} = bookmark.data;

	const viewModes = {
		list: 'list',
		card: 'card',
		headline: 'headline',
	};
	
	const bookmarkClassNames = classNames({
		[styles.bookmark]: true,
		[styles.listView]: mode === viewModes.list || !(mode in viewModes),
		[styles.cardView]: mode === viewModes.card,
		[styles.headlineView]: mode === viewModes.headline,
	});


	const [isChangeBookmarkModalVisible, setIsChangeBookmarkModalVisible] = useState(false);

	// toggling change bookmark modal visibility
	const toggleChangeBookmarkModalVisibility = () => setIsChangeBookmarkModalVisible(prevState => !prevState);



	return (
		<React.Fragment>
			<div className={bookmarkClassNames}>
				
				<div className={styles.content}>
					<div className={styles.imgContainer}>
						<a href={link}>
							<img 
								src={
									mode === viewModes.headline ? 
										(favicon ? favicon : defaultFavicon.src) 
									: 
										(imgSrc ? imgSrc : defaultBookmarkImage.src)
								} 
								alt="Preview image of resource"
							/>
						</a>
					</div>
					
					<div className={styles.text}>
						<div>
							<h4><a href={link}>{title}</a></h4>
							<p>{description}</p>
						</div>
						<div className={styles.subtext}>
							<span className={styles.domain}><a href={link}>{domain}</a></span>
							<span className={styles.date}>{ bookmark.createdAt }</span>
						</div>
					</div>
				</div>

				
				<div className={styles.toolbar}>
					<ToolbarIcon onClick={() => {}}>
						<a href={link} target="_blank">
							<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_65_155)">
									<path d="M19.8125 16.75H18.9375C18.8215 16.75 18.7102 16.7961 18.6281 16.8781C18.5461 16.9602 18.5 17.0715 18.5 17.1875V20.25H9.75V11.5H13.6875C13.8035 11.5 13.9148 11.4539 13.9969 11.3719C14.0789 11.2898 14.125 11.1785 14.125 11.0625V10.1875C14.125 10.0715 14.0789 9.96019 13.9969 9.87814C13.9148 9.79609 13.8035 9.75 13.6875 9.75H9.3125C8.9644 9.75 8.63056 9.88828 8.38442 10.1344C8.13828 10.3806 8 10.7144 8 11.0625V20.6875C8 21.0356 8.13828 21.3694 8.38442 21.6156C8.63056 21.8617 8.9644 22 9.3125 22H18.9375C19.2856 22 19.6194 21.8617 19.8656 21.6156C20.1117 21.3694 20.25 21.0356 20.25 20.6875V17.1875C20.25 17.0715 20.2039 16.9602 20.1219 16.8781C20.0398 16.7961 19.9285 16.75 19.8125 16.75ZM21.3438 8H17.8438C17.2594 8 16.9674 8.70848 17.3789 9.12109L18.3559 10.0981L11.6914 16.7601C11.6302 16.8211 11.5817 16.8935 11.5486 16.9733C11.5154 17.0531 11.4984 17.1386 11.4984 17.225C11.4984 17.3113 11.5154 17.3969 11.5486 17.4766C11.5817 17.5564 11.6302 17.6288 11.6914 17.6898L12.3113 18.3086C12.3723 18.3698 12.4447 18.4183 12.5245 18.4514C12.6042 18.4846 12.6898 18.5016 12.7761 18.5016C12.8625 18.5016 12.948 18.4846 13.0278 18.4514C13.1076 18.4183 13.18 18.3698 13.241 18.3086L19.9022 11.6455L20.8789 12.6211C21.2891 13.0312 22 12.7441 22 12.1562V8.65625C22 8.4822 21.9309 8.31528 21.8078 8.19221C21.6847 8.06914 21.5178 8 21.3438 8V8Z" fill="#6A6A6A"/>
								</g>
								<rect x="0.5" y="0.5" width="29" height="29" rx="7.5" stroke="#6A6A6A"/>
								<defs>
									<clipPath id="clip0_65_155">
										<rect width="14" height="14" fill="white" transform="translate(8 8)"/>
									</clipPath>
								</defs>
							</svg>
						</a>
					</ToolbarIcon>

					<ToolbarIcon onClick={() => alert('View-In-Frame coming soon...')}>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M22.9033 14.6008C21.3969 11.7075 18.4147 9.75 15 9.75C11.5853 9.75 8.60221 11.7089 7.09665 14.6011C7.03311 14.7248 7 14.8615 7 15.0001C7 15.1388 7.03311 15.2755 7.09665 15.3992C8.60304 18.2925 11.5853 20.25 15 20.25C18.4147 20.25 21.3978 18.2911 22.9033 15.3989C22.9669 15.2752 23 15.1385 23 14.9999C23 14.8612 22.9669 14.7245 22.9033 14.6008ZM15 18.9375C14.2089 18.9375 13.4355 18.7066 12.7777 18.2739C12.1199 17.8413 11.6072 17.2263 11.3045 16.5068C11.0017 15.7873 10.9225 14.9956 11.0768 14.2318C11.2312 13.468 11.6121 12.7664 12.1716 12.2158C12.731 11.6651 13.4437 11.2901 14.2196 11.1382C14.9955 10.9862 15.7998 11.0642 16.5307 11.3622C17.2616 11.6602 17.8863 12.1649 18.3259 12.8124C18.7654 13.46 19 14.2212 19 15C19.0002 15.5172 18.897 16.0293 18.696 16.5071C18.4951 16.9849 18.2005 17.4191 17.829 17.7848C17.4575 18.1505 17.0164 18.4405 16.531 18.6383C16.0456 18.8361 15.5253 18.9378 15 18.9375ZM15 12.375C14.762 12.3783 14.5255 12.4131 14.2969 12.4786C14.4853 12.7307 14.5757 13.0408 14.5518 13.3528C14.5278 13.6648 14.391 13.958 14.1662 14.1793C13.9415 14.4005 13.6436 14.5352 13.3266 14.5588C13.0097 14.5824 12.6946 14.4934 12.4386 14.3079C12.2928 14.8366 12.3191 15.3971 12.5138 15.9103C12.7086 16.4235 13.0619 16.8637 13.524 17.1689C13.9862 17.4741 14.534 17.629 15.0903 17.6117C15.6465 17.5944 16.1833 17.4058 16.625 17.0725C17.0666 16.7392 17.391 16.2779 17.5524 15.7536C17.7139 15.2293 17.7042 14.6684 17.5248 14.1498C17.3454 13.6312 17.0053 13.181 16.5524 12.8626C16.0995 12.5443 15.5565 12.3737 15 12.375Z" fill="#6A6A6A"/>
							<rect x="0.5" y="0.5" width="29" height="29" rx="7.5" stroke="#6A6A6A"/>
						</svg>
					</ToolbarIcon>

					<ToolbarIcon onClick={toggleChangeBookmarkModalVisibility}>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_65_163)">
								<path d="M19.4844 10.1138L21.8333 12.4041C21.9323 12.5006 21.9323 12.658 21.8333 12.7545L16.1458 18.2998L13.7292 18.5613C13.4062 18.5968 13.1328 18.3302 13.1693 18.0154L13.4375 15.6592L19.125 10.1138C19.224 10.0174 19.3854 10.0174 19.4844 10.1138ZM23.7031 9.53239L22.4323 8.29333C22.0365 7.90739 21.3932 7.90739 20.9948 8.29333L20.0729 9.19216C19.974 9.28864 19.974 9.44606 20.0729 9.54255L22.4219 11.8328C22.5208 11.9293 22.6823 11.9293 22.7812 11.8328L23.7031 10.934C24.099 10.5455 24.099 9.91833 23.7031 9.53239ZM19 16.7916V19.3763H10.6667V11.2513H16.651C16.7344 11.2513 16.8125 11.2183 16.8724 11.1625L17.9141 10.1468C18.112 9.95388 17.9714 9.62634 17.6927 9.62634H10.25C9.5599 9.62634 9 10.1722 9 10.8451V19.7826C9 20.4554 9.5599 21.0013 10.25 21.0013H19.4167C20.1068 21.0013 20.6667 20.4554 20.6667 19.7826V15.7759C20.6667 15.5043 20.3307 15.3697 20.1328 15.5601L19.0911 16.5758C19.0339 16.6342 19 16.7103 19 16.7916Z" fill="#6A6A6A"/>
							</g>
							<rect x="0.5" y="0.5" width="29" height="29" rx="7.5" stroke="#6A6A6A"/>
							<defs>
								<clipPath id="clip0_65_163">
									<rect width="15" height="13" fill="white" transform="translate(9 8)"/>
								</clipPath>
							</defs>
						</svg>
					</ToolbarIcon>

					<ToolbarIcon onClick={onDelete}>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g clipPath="url(#clip0_65_167)">
							<path d="M9.85714 19.7811C9.85714 20.1043 9.9926 20.4143 10.2337 20.6429C10.4748 20.8714 10.8019 20.9998 11.1429 20.9998H18.8571C19.1981 20.9998 19.5252 20.8714 19.7663 20.6429C20.0074 20.4143 20.1429 20.1043 20.1429 19.7811V11.2498H9.85714V19.7811ZM17.1429 13.2811C17.1429 13.1733 17.188 13.07 17.2684 12.9938C17.3488 12.9176 17.4578 12.8748 17.5714 12.8748C17.6851 12.8748 17.7941 12.9176 17.8745 12.9938C17.9548 13.07 18 13.1733 18 13.2811V18.9686C18 19.0763 17.9548 19.1797 17.8745 19.2558C17.7941 19.332 17.6851 19.3748 17.5714 19.3748C17.4578 19.3748 17.3488 19.332 17.2684 19.2558C17.188 19.1797 17.1429 19.0763 17.1429 18.9686V13.2811ZM14.5714 13.2811C14.5714 13.1733 14.6166 13.07 14.697 12.9938C14.7773 12.9176 14.8863 12.8748 15 12.8748C15.1137 12.8748 15.2227 12.9176 15.303 12.9938C15.3834 13.07 15.4286 13.1733 15.4286 13.2811V18.9686C15.4286 19.0763 15.3834 19.1797 15.303 19.2558C15.2227 19.332 15.1137 19.3748 15 19.3748C14.8863 19.3748 14.7773 19.332 14.697 19.2558C14.6166 19.1797 14.5714 19.0763 14.5714 18.9686V13.2811ZM12 13.2811C12 13.1733 12.0452 13.07 12.1255 12.9938C12.2059 12.9176 12.3149 12.8748 12.4286 12.8748C12.5422 12.8748 12.6512 12.9176 12.7316 12.9938C12.812 13.07 12.8571 13.1733 12.8571 13.2811V18.9686C12.8571 19.0763 12.812 19.1797 12.7316 19.2558C12.6512 19.332 12.5422 19.3748 12.4286 19.3748C12.3149 19.3748 12.2059 19.332 12.1255 19.2558C12.0452 19.1797 12 19.0763 12 18.9686V13.2811ZM20.5714 8.81234H17.3571L17.1054 8.33753C17.052 8.23602 16.9699 8.15064 16.8681 8.09098C16.7664 8.03132 16.6491 7.99976 16.5295 7.99984H13.4679C13.3485 7.9994 13.2314 8.03085 13.13 8.09057C13.0287 8.1503 12.9471 8.23589 12.8946 8.33753L12.6429 8.81234H9.42857C9.31491 8.81234 9.2059 8.85514 9.12553 8.93132C9.04515 9.00751 9 9.11084 9 9.21859V10.0311C9 10.1388 9.04515 10.2422 9.12553 10.3183C9.2059 10.3945 9.31491 10.4373 9.42857 10.4373H20.5714C20.6851 10.4373 20.7941 10.3945 20.8745 10.3183C20.9548 10.2422 21 10.1388 21 10.0311V9.21859C21 9.11084 20.9548 9.00751 20.8745 8.93132C20.7941 8.85514 20.6851 8.81234 20.5714 8.81234Z" fill="#6A6A6A"/>
							</g>
							<rect x="0.5" y="0.5" width="29" height="29" rx="7.5" stroke="#6A6A6A"/>
							<defs>
								<clipPath id="clip0_65_167">
									<rect width="12" height="13" fill="white" transform="translate(9 8)"/>
								</clipPath>
							</defs>
						</svg>
					</ToolbarIcon>
				</div>
			</div>

			<ChangeBookmarkModal
				isVisible={isChangeBookmarkModalVisible}
				toggleVisibility={toggleChangeBookmarkModalVisibility}
				bookmark={bookmark}
			/>
		</React.Fragment>
	);
};


// default props
Bookmark.defaultProps = {
	mode: 'list'
};


// prop types
const nullableString = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.oneOf([null])
]);
const requiredString = PropTypes.string.isRequired;

Bookmark.propTypes = {
	bookmark: PropTypes.shape({
		data: PropTypes.shape({
			title: requiredString, 
			description: nullableString, 
			domain: requiredString, 
			link: requiredString, 
			imgSrc: nullableString,
			favicon: nullableString
		}).isRequired
	}),
	mode: PropTypes.oneOf(['list', 'card', 'headline']),
	onDelete: PropTypes.func.isRequired,
};


export default Bookmark;

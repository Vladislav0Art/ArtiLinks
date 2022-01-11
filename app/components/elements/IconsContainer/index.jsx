import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// styles
import styles from './styles.module.scss';



const IconsContainer = ({ 
	name, 
	icons, 
	onClick, 
	selectedIconId
}) => {

	return (
		<div className={styles.content}>
			<span>{ name }</span>
			<div className={styles.icons}>
				{
					icons.map(icon => (
						<img 
							className={classNames({
								[styles.selected]: selectedIconId === icon.id
							})}
							key={icon.id} 
							src={icon.src} 
							onClick={() => onClick(icon)}
							alt="Collection icon"
						/>
					))
				}
			</div>
		</div>
	);
};


// prop types
const requiredString = PropTypes.string.isRequired;

IconsContainer.propTypes = {
	name: requiredString,
	icons: PropTypes.arrayOf(
		PropTypes.shape({
			id: requiredString,
			src: requiredString
		})
	).isRequired,
	onClick: PropTypes.func.isRequired,
	selectedIconId: PropTypes.string,
};


export default IconsContainer;

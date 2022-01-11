import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// styles
import styles from './styles.module.scss';
// images
import defaultCollectionIcon from '/public/svg/dashboard/default-collection-icon.svg';



const BookmarkModalCollection = ({
	collection,
	selected,
	onClick,
}) => {
	const { label, icon, bookmarksCount } = collection;

	return (
		<div
			onClick={onClick}
			className={classNames({
				[styles.collection]: true,
				[styles.selected]: selected	
			})}
		>
			<div className={styles.label}>
				<img src={ icon ? icon : defaultCollectionIcon.src } alt="Collection icon" />
				<span>{ label }</span>
			</div>

			<span>{ bookmarksCount }</span>
		</div>
	);
};


// prop types
const collectionShape = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	icon: PropTypes.string,
	bookmarksCount: PropTypes.number.isRequired,
});

BookmarkModalCollection.propTypes = {
	collection: collectionShape.isRequired,
};


export default BookmarkModalCollection;
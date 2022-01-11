import React from 'react';
import PropTypes from 'prop-types';
// elements
import { BookmarkModalCollection } from '../../elements';
// styles
import styles from './styles.module.scss';


const BookmarkModalGroup = ({
	label,
	collections,
	selectedCollectionId,
	onCollectionClick,
}) => {

	return (
		<div className={styles.content}>
			<span className={styles.label}>{ label }</span>
			<div className={styles.collections}>
				{
					collections.map(collection => (
						<BookmarkModalCollection
							key={collection._id}
							onClick={() => onCollectionClick(collection._id)}
							collection={collection}
							selected={selectedCollectionId === collection._id}
						/>
					))
				}
			</div>
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

BookmarkModalGroup.propTypes = {
	label: PropTypes.string.isRequired,
	collections: PropTypes.arrayOf(collectionShape).isRequired,
	selectedCollectionId: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf([null])
	]),
	onCollectionClick: PropTypes.func.isRequired,
};


export default BookmarkModalGroup;

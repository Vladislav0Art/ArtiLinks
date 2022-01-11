import React from 'react';
import PropTypes from 'prop-types';
// elements
import { CollectionItem } from '../../elements';
// styles 
import styles from './styles.module.scss';
// hooks
import { useData } from '../../../hooks';


const CollectionList = ({ collections }) => {
	const { viewedCollection, setViewedCollectionAndBookmarks } = useData();

	return (
		<div className={styles.content}>
			{
				collections.map(collection => (
					<CollectionItem 
						key={collection._id}
						collection={collection}
						viewedCollectionId={viewedCollection._id}
						onCollectionClick={() => setViewedCollectionAndBookmarks(collection._id)}
					/>
				))
			}
		</div>
	);
};


// prop types
CollectionList.propTypes = {
	collections: PropTypes.arrayOf(PropTypes.object).isRequired
};


export default CollectionList;

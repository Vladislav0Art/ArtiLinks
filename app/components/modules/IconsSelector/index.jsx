import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// elements
import { IconsContainer } from '../../elements';
// contexts
import { FormContext } from '../../../contexts';
// styles
import styles from './styles.module.scss';
// default collection icons
import collectionIcons from '../../../utils/defaults/collection-icons';



const IconsSelector = ({ title }) => {
	// retriving data from form context
	const { form, handleIconSelect } = useContext(FormContext);

	return (
		<div className={styles.content}>
			<span className={styles.title}>{ title }</span>
			<div className={styles.wrapper}>
				<div className={styles.icons}>
					{
						collectionIcons.map(({ id, name, icons }) => (
							<IconsContainer
								key={id} 
								name={name} 
								icons={icons}
								onClick={handleIconSelect}
								selectedIconId={form.icon.id}
							/>
						))
					}
				</div>
			</div>
		</div>
	);
};



// prop types

IconsSelector.propTypes = {
	title: PropTypes.string.isRequired
};

export default IconsSelector;

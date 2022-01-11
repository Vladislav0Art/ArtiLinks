import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';
// elements
import { Container } from '../../elements';


const InfoBlock = ({ 
  title, 
  src, 
  alt, 
  descr, 
  align,
  titleWidth
}) => {
  return (
    <Container>
      <div className={`${styles.infoBlock} ${align === 'left' ? styles.infoBlockLeft : styles.infoBlockRight}`}>
        
		<h2 style={{
          	maxWidth: titleWidth
        }}>
			{ title }
		</h2>

        <div className={`${styles.content} ${align === 'left' ? styles.left : styles.right}`}>
          <img src={src} alt={alt} />
          <p>{ descr }</p>
        </div>
      </div>
    </Container>
  );
};


// default props
InfoBlock.defaultProps = {
	alt: 'Info block image',
	align: 'left',
	titleWidth: 600,
};

// prop types
const requiredString = PropTypes.string.isRequired;

InfoBlock.propTypes = {
	title: requiredString, 
	src: requiredString, 
	alt: requiredString, 
	descr: requiredString,
	align: PropTypes.oneOf(['left', 'right']),
	titleWidth: PropTypes.number.isRequired,
};


export default InfoBlock;
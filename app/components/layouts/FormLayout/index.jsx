import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';
// elements
import { Container } from '../../elements';
// images
import img from '/public/svg/forms/woman.svg';


const FormLayout = ({ title, children }) => {
  return (
    <Container>
      <div className={styles.content}>
        <h1>{ title }</h1>

        <div className={styles.main}>
          <img src={img.src} alt={'Image of a woman sitting'} />
          { children }
        </div>
      </div>
    </Container>
  );
};


// prop types
FormLayout.propTypes = {
	title: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};


export default FormLayout;

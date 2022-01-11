import React from 'react';
// styles
import styles from './styles.module.scss';
// elements
import { Container, ButtonLink } from '../../elements';
// images
import img from '/public/svg/landing/action-img.svg';
// utils/routes
import { REGISTRATION_PAGE, LOGIN_PAGE } from '../../../utils/routes/pages';




const ActionBlock = () => {
  return (
    <Container>
      <div className={styles.content}>
        <div className={styles.main}>
          <h3>
            <span>Register now for free!</span>
            <span>Or sign in if you have an account!</span>
          </h3>
          <div className={styles.btns}>

          <ButtonLink href={REGISTRATION_PAGE}>Create an account</ButtonLink>
          <ButtonLink href={LOGIN_PAGE}>Sign in</ButtonLink>
          
          </div>
        </div>

        <img src={img.src} alt="Image" />
      </div>

      
    </Container>
  );
};

export default ActionBlock;
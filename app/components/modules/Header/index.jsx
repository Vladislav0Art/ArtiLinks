import React from 'react';
// styles
import styles from './styles.module.scss';
// elements
import { Container, Logo, CustomLink } from '../../elements';
// utils/routes
import { REGISTRATION_PAGE, LOGIN_PAGE } from '../../../utils/routes/pages';


const Header = () => {
  return (
    <div className={styles.header}>
      <Container>
        <div className={styles.content}>
          <Logo />

          <div className={styles.links}>
            <CustomLink href={LOGIN_PAGE}>Sign in</CustomLink>
            <CustomLink href={REGISTRATION_PAGE}>Register</CustomLink>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Header;

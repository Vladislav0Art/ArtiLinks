import React from 'react';
// styles
import styles from './styles.module.scss';
// elements
import { Container, CustomLink } from '../../elements';
// utils/routes
import { HOME_PAGE } from '../../../utils/routes/pages';


const Footer = () => {

  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.content}>
          <div className={styles.links}>
            <CustomLink href={HOME_PAGE}>Premium</CustomLink>
            <CustomLink href={HOME_PAGE}>Help</CustomLink>
            <CustomLink href={HOME_PAGE}>Android</CustomLink>
            <CustomLink href={HOME_PAGE}>iOS</CustomLink>
          </div>

          <span className={styles.copyright}>© { (new Date()).getFullYear() } ArtiLinks, Inc.</span>
        </div>
      </Container>
    </div>
  );
}

export default Footer;

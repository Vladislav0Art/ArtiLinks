import React from 'react';
import Link from 'next/link';
// styles
import styles from './styles.module.scss';
// utils/routes
import { HOME_PAGE } from '../../../utils/routes/pages';


const Logo = () => (<h3 className={styles.logo}><Link href={HOME_PAGE}>ArtiLinks</Link></h3>);

export default Logo;

import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';
// utils/routes
import { HOME_PAGE } from '../../../utils/routes/pages';


const CustomLink = ({
    href, // default: HOME_PAGE
    as,
    passHref, // default: true
    replace,
    scroll,
    shallow,
    locale,
    children
}) => {
  return (
    <Link 
      href={href}
      as={as}
      passHref={passHref}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      locale={locale}
    >
      <a className={styles.link}>
        { children }
      </a>
    </Link>
  );
};

// default props
CustomLink.defaultProps = {
	href: HOME_PAGE,
	passHref: true,
	replace: false,
	scroll: false,
	shallow: false,
	locale: false,
};


// prop types
const nullableString = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.oneOf([null])
]);

const requiredBool = PropTypes.bool.isRequired;

CustomLink.propTypes = {
	href: PropTypes.string.isRequired,
	as: nullableString,
	passHref: requiredBool,
	replace: requiredBool,
	scroll: requiredBool,
	shallow: requiredBool,
	locale: requiredBool,
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};


export default CustomLink;

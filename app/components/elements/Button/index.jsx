import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// images
import loadingSvg from '/public/svg/loader.svg';


const Button = ({
  children,
  modification,
  dark,
  type,
  onClick
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async (event) => {
    if(isLoading) return;

    setIsLoading(true);
    await onClick(event);
    setIsLoading(false);
  };

  const btnClass = classNames({
    'button': true,
    [`button-${modification}`]: true,
    'button-dark': dark
  });

  return (
    <button className={btnClass} onClick={clickHandler} type={type}>
      { 
        isLoading ? 
          <img src={loadingSvg.src} alt={'Loading'}/>
        :
          children
      }
    </button>
  );
};


// default props
Button.defaultProps = {
	modification: 'default',
	dark: false,
	type: 'button',
	onClick: () => {}
};

// prop types
Button.propTypes = {
	children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,
	modification: PropTypes.oneOf(['default', 'huge', 'medium', 'thin', 'small']),
	dark: PropTypes.bool.isRequired,
	type: PropTypes.oneOf(['button', 'submit', 'reset']),
	onClick: PropTypes.func.isRequired
};



export default Button;

// next router
import Router from 'next/router';

// redirecting to provided resource
const redirect = (path) => {
	Router.push(path);
};

export default redirect;
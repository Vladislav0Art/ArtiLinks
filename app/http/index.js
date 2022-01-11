import axios from 'axios';
import { REFRESH_API_URL } from '../utils/routes/api';

const $api = axios.create({
  withCredentials: true,
  // baseURL: API_URL
});


// attaching access token to each request made from client side
$api.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('access-token')}`;
  return config; 
});



$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    // request from client
    const originalRequest = error.config;

    // if 401 status code received try to refresh tokens
    if(error?.response?.status === 401 && error.config && !error.config._isRetry) {
      // if original request returns 401 status do not run the code below
      originalRequest._isRetry = true;
      
      try {
        const response = await axios.get(REFRESH_API_URL, {
          withCredentials: true
        });
        // saves in local storage
        localStorage.setItem('access-token', response.data.accessToken);
        return $api.request(originalRequest);
      }
      catch(err) {
        console.error('Unauthorized');
      }
    }

    throw error;
  }
);

export default $api;
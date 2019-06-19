import axios from 'axios';

export const getToken = () => axios.get(`${process.env.REACT_APP_API_URL}/auth/renew`);

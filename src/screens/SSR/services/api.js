import axios from 'axios';

export const postListApplications = query =>
  axios.post(
    `${process.env.REACT_APP_ELASTIC_URL}/applications/_search`,
    query
  );

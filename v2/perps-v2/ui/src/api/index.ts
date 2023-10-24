import axios from 'axios';

import { apiUrl } from '../utils';

const requester = axios.create({
  baseURL: apiUrl ?? 'https://synthetix.io/api',
  timeout: 300000,
});

requester.interceptors.response.use(
  (response) => response,
  (error) => {
    throw new Error(error);
  }
);

export default requester;

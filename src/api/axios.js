import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://protocol-sandbox.lumx.io/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = token => {
  instance.defaults.headers.common['Authorization'] = `${token}`;
};

export default instance;

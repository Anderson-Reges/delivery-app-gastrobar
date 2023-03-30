import axios from 'axios';

const PORT = process.env.REACT_APP_API_PORT;

const fetch = axios.create({
  baseURL: `http://localhost:${PORT}`,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

const api = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export default api;

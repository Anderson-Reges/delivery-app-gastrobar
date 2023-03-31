import axios from 'axios';

const fetch = axios.create({
  baseURL: 'http://localhost:3002',
});

const api = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export default api;

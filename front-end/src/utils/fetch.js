import axios from 'axios';

const fetch = axios.create({
  // baseURL: 'http://localhost:3002',
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
}); // Chamou a porta da variavel ambiente

const api = async (method, endpoint, body) => fetch
  .request({ method, url: endpoint, data: body })
  .then(({ status, data }) => ({ status, data }));

export default api;

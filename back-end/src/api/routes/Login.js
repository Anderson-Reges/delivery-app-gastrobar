const Router = require('express');
const { LoginControl } = require('../controllers/Login.controller');
const { evaluateLogin } = require('../middlewares/Login.middleware');

const routes = Router();

routes
  .post('/', evaluateLogin, LoginControl);

module.exports = routes;

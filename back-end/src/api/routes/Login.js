const Router = require('express');
const { LoginControl } = require('../controllers/Access.controller');
const { evaluateLogin } = require('../middlewares/Access.middleware');

const routes = Router();

routes
  .post('/', evaluateLogin, LoginControl);

module.exports = routes;

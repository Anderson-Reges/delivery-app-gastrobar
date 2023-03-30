const Router = require('express');
const { LoginControl } = require('../controllers/Access.controller');
const { validateLogin } = require('../middlewares/Access.middleware');

const routes = Router();

routes
  .post('/', validateLogin, LoginControl);

module.exports = routes;

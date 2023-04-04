const Router = require('express');
const { findUserControl } = require('../controllers/User.controler');

const routes = Router();

routes
  .post('/', findUserControl);

module.exports = routes;
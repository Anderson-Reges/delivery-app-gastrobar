const Router = require('express');
const { findAllControl } = require('../controllers/Products.controller');

const routes = Router();

routes
  .get('/', findAllControl);

module.exports = routes;
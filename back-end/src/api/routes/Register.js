const Router = require('express');
const { RegisterControl } = require('../controllers/Access.controller');

const routes = Router();

routes
  .post('/', RegisterControl);

module.exports = routes;
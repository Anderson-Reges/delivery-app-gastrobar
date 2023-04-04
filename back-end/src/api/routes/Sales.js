const Router = require('express');
const { createControl } = require('../controllers/Sales.controller');
const ValidateToken = require('../middlewares/ValidateToken');

const routes = Router();

routes
  .post('/', ValidateToken, createControl);

module.exports = routes;
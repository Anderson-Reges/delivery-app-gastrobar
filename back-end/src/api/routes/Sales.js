const Router = require('express');
const { createControl, getAllControl, getSaleControl } = require('../controllers/Sales.controller');
const ValidateToken = require('../middlewares/ValidateToken');

const routes = Router();

routes
  .get('/', getAllControl)
  .get('/:id', getSaleControl)
  .post('/', ValidateToken, createControl);

module.exports = routes;
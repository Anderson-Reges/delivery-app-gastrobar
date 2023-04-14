const Router = require('express');
const {
  createControl, getAllControl, getSaleControl, updateControl, getAllSalesByUserControl,
} = require('../controllers/Sales.controller');
const ValidateToken = require('../middlewares/ValidateToken');

const routes = Router();

routes
  .get('/', getAllControl)
  .get('/user/:id', getAllSalesByUserControl)
  .get('/:id', getSaleControl)
  .put('/:id', updateControl)
  .post('/', ValidateToken, createControl);

module.exports = routes;
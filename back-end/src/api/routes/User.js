const Router = require('express');
const {
  findUserControl, findAllUserControl, deleteUserControl,
} = require('../controllers/User.controler');

const routes = Router();

routes
  .get('/', findAllUserControl)
  .post('/', findUserControl)
  .delete('/:id', deleteUserControl);

module.exports = routes;
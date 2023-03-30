const Router = require('express');
const { RegisterControl } = require('../controllers/Access.controller');
const { validateRegister } = require('../middlewares/Access.middleware');

const routes = Router();

routes
  .post('/', validateRegister, RegisterControl);

module.exports = routes;
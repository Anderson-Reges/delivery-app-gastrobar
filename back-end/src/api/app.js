const express = require('express');
const cors = require('cors');
const { Login, Register, Products, User, Sales } = require('./routes');

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(express.static('public'))
  .use('/login', Login)
  .use('/register', Register)
  .use('/admin/manage', Register)
  .use('/products', Products)
  .use('/user', User)
  .use('/sales', Sales);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

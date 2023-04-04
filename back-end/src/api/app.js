const express = require('express');
const cors = require('cors');
const { Login, Register, Products, User } = require('./routes');

const app = express();
app
  .use(cors())
  .use(express.json())
  .use(express.static('public'))
  .use('/login', Login)
  .use('/register', Register)
  .use('/products', Products)
  .use('/user', User);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

const express = require('express');
const cors = require('cors');
const { Login, Register, Products } = require('./routes');

const app = express();
app
  .use(cors())
  .use(express.json())
  .use('/login', Login)
  .use('/register', Register)
  .use('/products', Products);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

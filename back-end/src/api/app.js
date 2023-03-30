const express = require('express');
const { Login, Register } = require('./routes');

const app = express();
app.use(express.json());
app.use('/login', Login);
app.use('/register', Register);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

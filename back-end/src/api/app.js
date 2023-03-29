const express = require('express');
const { Login } = require('./routes');

const app = express();
app.use(express.json());
app.use('/login', Login);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

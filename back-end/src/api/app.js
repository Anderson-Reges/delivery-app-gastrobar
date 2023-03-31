const express = require('express');
const cors = require('cors');
const { Login, Register } = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/login', Login);
app.use('/register', Register);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

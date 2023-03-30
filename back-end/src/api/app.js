const express = require('express');
const cors = require('cors');
const { Login, Register } = require('./routes');

const port = process.env.REACT_PORT;

const corsOptions = {
  origin: `http://localhost:${port}`, 
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use('/login', Login);
app.use('/register', Register);

app.get('/coffee', (_req, res) => res.status(418).end());

module.exports = app;

const jwt = require('jsonwebtoken');
const jwtKey = require('fs')
  .readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

require('dotenv/config');
const { findOne } = require('../services/User.service');

const ValidateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, jwtKey);
    const user = await findOne(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Token Invalido.' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = ValidateToken;
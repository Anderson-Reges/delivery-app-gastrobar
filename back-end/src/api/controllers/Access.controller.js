const { Login } = require('../services/Access.service');

const LoginControl = async (req, res) => {
  const { email, password } = req.body;

  const result = await Login(email, password);

  return res.status(200).json(result);
};

module.exports = {
  LoginControl,
};
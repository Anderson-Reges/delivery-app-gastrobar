const { Login, Register } = require('../services/Access.service');

const LoginControl = async (req, res) => {
  const { email, password } = req.body;

  const result = await Login(email, password);
  console.log(email, password);
  return res.status(200).json(result);
};

const RegisterControl = async (req, res) => {
  const result = await Register(req.body);
  
  return res.status(201).json(result);
};

module.exports = {
  LoginControl,
  RegisterControl,
};
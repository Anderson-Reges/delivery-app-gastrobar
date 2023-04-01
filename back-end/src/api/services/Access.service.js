const jwt = require('jsonwebtoken');
const md5 = require('md5');
const dotenv = require('dotenv');
const { User } = require('../../database/models');

dotenv.config(); // importa variavel de ambiente do .ENV

const secret = process.env.JWT_SECRET || 'secret'; 
// || 'secret'; é para caso não tenha sido definido a variavel ambiente
const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };

const Login = async (email, _password) => {
  const user = await User.findOne({ where: { email }, raw: true });
  const newUser = { name: user.name, email: user.email, role: user.role };
  const token = jwt.sign(newUser, secret, jwtConfig);

  return {
    ...newUser,
    token,
  };
};

const Register = async (newAccount) => {
  const pass = md5(newAccount.password);
  const newUser = {
    name: newAccount.name,
    email: newAccount.email,
    role: newAccount.role || 'customer',
  };
  const token = jwt.sign(newUser, secret, jwtConfig);
  const account = {
    name: newAccount.name,
    email: newAccount.email,
    password: pass,
    role: newAccount.role || 'customer', 
  };
  await User.create(account);

  return {
    ...newUser,
    token,
  };
};

module.exports = {
  Login,
  Register,
};
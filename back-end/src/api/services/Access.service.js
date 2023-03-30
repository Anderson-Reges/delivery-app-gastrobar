const jwt = require('jsonwebtoken');
const { User } = require('../../database/models');

const secret = process.env.JWT_SECRET;
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

module.exports = {
  Login,
};
const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../../database/models');

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const pass = md5(password);
  const user = await User.findOne({
    where: { email },
  });
  if (!user || pass !== user.password) return res.status(404).json({ message: 'Not found' });
  next();
};

const validateRegister = async (req, res, next) => {
  const { name, email } = req.body;
  const user = await User.findOne({
    where: {
      [Op.or]: [
        { name },
        { email },
      ],  
    },
  });
  if (user) return res.status(409).json({ message: 'name or email already registered' });
  next();
};

module.exports = {
  validateLogin,
  validateRegister,
};
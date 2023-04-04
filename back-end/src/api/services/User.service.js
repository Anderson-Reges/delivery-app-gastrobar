const { User } = require('../../database/models');

const findUserByRole = async (role) => {
  const users = await User.findAll({
    where: { role },
    attributes: {
      exclude: ['password', 'email'],
    },
  }, { raw: true });

  return users;
};

const findOne = async (email) => {
  const user = await User.findOne({
    where: { email },
  }, { raw: true });

  return user;
};

module.exports = {
  findUserByRole,
  findOne,
};
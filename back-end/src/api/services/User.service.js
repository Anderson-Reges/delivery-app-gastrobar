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

const findOne = async (id) => {
  const user = await User.findOne({
    where: { id },
  }, { raw: true });

  return user;
};

module.exports = {
  findUserByRole,
  findOne,
};
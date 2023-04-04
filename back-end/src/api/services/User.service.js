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

module.exports = {
  findUserByRole,
};
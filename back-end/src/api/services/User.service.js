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

const findAll = async () => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  }, { raw: true });

  return users;
};

const deleteUser = async (id) => {
  const deleted = await User.destroy({
    where: {
      id,
    },
  });

  return deleted;
};

module.exports = {
  findUserByRole,
  findOne,
  findAll,
  deleteUser,
};
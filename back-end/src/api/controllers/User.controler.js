const { findUserByRole, findAll, deleteUser } = require('../services/User.service');

const findUserControl = async (req, res) => {
  const result = await findUserByRole(req.body.role);
  return res.status(200).json(result);
};

const findAllUserControl = async (_req, res) => {
  const result = await findAll();
  return res.status(200).json(result);
};

const deleteUserControl = async (req, res) => {
  const { id } = req.params;
  await deleteUser(id);
  return res.status(200).json({ message: `O usuario de id ${id} foi excluido` });
};

module.exports = {
  findUserControl,
  findAllUserControl,
  deleteUserControl,
};
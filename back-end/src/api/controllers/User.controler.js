const { findUserByRole } = require('../services/User.service');

const findUserControl = async (req, res) => {
  const result = await findUserByRole(req.body.role);
  return res.status(200).json(result);
};

module.exports = {
  findUserControl,
};
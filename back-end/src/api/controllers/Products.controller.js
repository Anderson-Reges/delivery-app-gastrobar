const { findAllProducts } = require('../services/Products.service');

const findAllControl = async (_req, res) => {
  const result = await findAllProducts();
  return res.status(200).json(result);
};

module.exports = {
  findAllControl,
};
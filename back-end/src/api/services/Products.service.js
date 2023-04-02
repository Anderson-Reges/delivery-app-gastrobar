const { Product } = require('../../database/models');

const findAllProducts = async () => {
  const products = await Product.findAll({ raw: true });
  return products;
};

module.exports = {
  findAllProducts,
};
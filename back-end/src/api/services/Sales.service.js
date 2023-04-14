const { Sale, SaleProduct, Product, User } = require('../../database/models');

const create = async (sale) => {
  const newSale = {
    ...sale,
    saleDate: new Date(),
    status: 'Pendente',
  };
  const createdSale = await Sale.create(newSale);
  await Promise.all(
    sale.cartItens.map(async ({ quantity, id }) => {
      await SaleProduct.create({ saleId: createdSale.id, productId: id, quantity });
    }),
  );
  return {
    ...createdSale.dataValues,
    products: sale.cartItens,
  };
};

const getAllSalesByUser = async (id) => {
  const sales = await Sale.findAll({
    where: { userId: id },
  });

  return sales;
};

const getAll = async () => {
  const sale = await Sale.findAll();
  return sale;
};

const getById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
    include: { model: Product, as: 'products' },
  });

  const seller = await User.findOne({
    where: { id: sale.sellerId },
    attributes: {
      exclude: ['password'],
    },
  });
  const newsale = {
    sale,
    seller,
  };

  return newsale;
};

const update = async (sale, id) => {
  const updatedSale = await Sale.update(
    { ...sale },
    { where: { id } },
  );

  return updatedSale;
};

module.exports = {
  getAll,
  getAllSalesByUser,
  getById,
  create,
  update,
};
const { Sale } = require('../../database/models');

const create = async (sale) => {
  const newSale = {
    ...sale,
    saleDate: new Date(),
    status: 'Pendente',
  };
  const createdSale = await Sale.create(newSale);
  return createdSale;
};

const getById = async (id) => {
  const sale = await Sale.findOne({
    where: { id },
  });

  return sale;
};

const update = async (sale) => {
  const updatedSale = await Sale.update(
    { ...sale },
    { where: { id: sale.id } },
  );

  return updatedSale;
};

module.exports = {
  create,
  getById,
  update,
};
const {
  getAll,
  create,
  getById,
} = require('../services/Sales.service');

const createControl = async (req, res) => {
  const sale = req.body;
  const result = await create(sale);

  return res.status(201).json(result);
};

const getAllControl = async (_req, res) => {
  const sales = await getAll();
  return res.status(200).json(sales);
};

const getSaleControl = async (req, res) => {
  const { id } = req.params;
  const sale = await getById(id);
  return res.status(200).json(sale);
};

module.exports = {
  createControl,
  getAllControl,
  getSaleControl,
};
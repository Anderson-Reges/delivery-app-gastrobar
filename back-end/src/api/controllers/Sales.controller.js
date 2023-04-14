const {
  getAll,
  create,
  getById,
  update,
  getAllSalesByUser,
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

const getAllSalesByUserControl = async (req, res) => {
  const { id } = req.params;
  const sales = await getAllSalesByUser(id);
  return res.status(200).json(sales);
};

const updateControl = async (req, res) => {
  const { id } = req.params;
  await update(req.body, id);
  return res.status(201).json({ message: `pedido ${id} atualizada com sucesso` });
};

module.exports = {
  createControl,
  getAllControl,
  getAllSalesByUserControl,
  getSaleControl,
  updateControl,
};
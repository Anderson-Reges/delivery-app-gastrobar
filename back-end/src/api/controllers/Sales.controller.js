const {
  // getById,
  create,
} = require('../services/Sales.service');

const createControl = async (req, res) => {
  const sale = req.body;
  const result = await create(sale);

  return res.status(201).json(result);
};

module.exports = {
  createControl,
};

// O avaliador verificará se ao final do checkout é disparado uma request POST com uma autorização (token) válida, que retorne status 201 - Created;
// O avaliador verificará se após isso o endereço da url contém o id do pedido criado. Por exemplo, se o id gerado for 3, então: localhost:3000/customer/orders/3.
// O avaliador selecionará a pessoa vendedora pelo id como informado no requisito 17
const salesModel = require('../models/salesModel');

const getAllSales = async () => salesModel.getAllSales();

const getSalesById = async (saleId) => salesModel.getSalesById(saleId);

const destroySales = async (saleId) => salesModel.destroySales(saleId);

/* 

const addSales = async (saleId, productId, quantity) =>
  salesModel.addSales(saleId, productId, quantity);

const updateSales = async (sale) => {
  const id = Number(sale.saleId);
  const updated = await salesModel.updateProducts(id);
  if (!updated.affectedRows) {
    return null;
  }
  return { ...sale, id };
};

 */
module.exports = {
  getAllSales,
  getSalesById,
//  addSales,
//  updateSales,
  destroySales,
};
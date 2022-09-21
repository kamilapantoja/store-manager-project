const productsModel = require('../models/productsModel');

const getAllProducts = async () => productsModel.getAllProducts();

const getProductsById = async (id) => productsModel.getProductsById(id);

const addProducts = async (id, name) => productsModel.addProducts(id, name);

const updateProducts = async (product) => {
  const id = Number(product.id);
  const updated = await productsModel.updateProducts(product.name, id);
  if (!updated.affectedRows) {
    return null;
  }
  return { ...product, id };
};

const destroyProducts = async (id) => {
  const product = await productsModel.getProductsById(id);
  if (!product) return null;
  await productsModel.destroyProducts(id);
  return { ...product };
};

module.exports = {
  getAllProducts,
  getProductsById,
  addProducts,
  updateProducts,
  destroyProducts,
};

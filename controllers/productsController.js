const productsServices = require('../services/productsServices');

const erro = 'Algo deu errado';

const getAllProducts = async (req, res) => {
  try {
    const products = await productsServices.getAllProducts();
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: erro });
  }
};

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsServices.getProductsById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

const addProducts = async (req, res) => {
  const { name } = req.body;
  try {
    const newProduct = await productsServices.addProducts(name);
    return res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const product = await productsServices.updateProducts({ name, id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

const destroyProducts = async (req, res) => {
  try {
    const product = await productsServices.destroyProducts(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.status(204).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

module.exports = {
  getAllProducts,
  getProductsById,
  addProducts,
  updateProducts,
  destroyProducts,
};
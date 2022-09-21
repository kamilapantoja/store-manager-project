const salesServices = require('../services/salesServices');

const erro = 'Algo deu errado';

const getAllSales = async (req, res) => {
  try {
    const sales = await salesServices.getAllSales();
    if (!sales) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sales);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: erro });
  }
};

const getSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSalesById(id);
    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

const destroySales = async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await salesServices.getSalesById(id);
    if (sale.length === 0) return res.status(404).json({ message: 'Sale not found' });
    const saleDestroyed = await salesServices.destroySales(id);
    if (saleDestroyed.affectedRows !== 0) return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

/* 

const addSales = async (req, res) => {
  const { saleId, productId, quantity } = req.body;
  try {
    const newSale = await salesServices.addSales(saleId, productId, quantity);
    return res.status(201).json(newSale);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};

const updateSale = async (req, res) => {
  const saleId = req.params.sale_id;
  const productId = req.body.product_id;
  try {
    const sale = await salesServices.updateProducts({ productId, saleId });
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }
    return res.status(200).json(sale);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: erro });
  }
};
 */

/*  */
module.exports = {
  getAllSales,
  getSalesById,
  destroySales,
/*   addSales,
  updateSale,
   */
};
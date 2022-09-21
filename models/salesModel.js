const connection = require('./connections');

// 8 - Crie endpoints para listar vendas
const getAllSales = async () => {
  const query = `SELECT sales.id AS saleId, sales.date, sales_products.product_id AS productId,
  sales_products.quantity FROM StoreManager.sales AS sales
  INNER JOIN StoreManager.sales_products AS sales_products
  WHERE sales.id = sales_products.sale_id
  ORDER BY saleId, productId`;
  const [results] = await connection.execute(query);
  return results;
};

const getSalesById = async (saleId) => {
  const query = `SELECT sales.date, sales_products.product_id AS productId,
  sales_products.quantity FROM StoreManager.sales AS sales
  INNER JOIN StoreManager.sales_products AS sales_products
  WHERE sales_products.sale_id = sales.id
  AND sales_products.sale_id = ?;`;
  const [result] = await connection.execute(query, [saleId]);
  return result;
};

const destroySales = async (saleId) => {
  const result = connection.execute('DELETE FROM StoreManager.sales WHERE id = ?;', [saleId]);
  return result;
}; 

/* const addSales = async () => {
  const [sale] = await connection.execute('INSERT INTO StoreManager.sales VALUES (?);');
  return sale.insertId;
}; */

/* const connection = require('./connections');

const addSales = async (saleId, productId, quantity) => {
  const query = `INSERT INTO StoreManager.sales_products 
  (sale_id, product_id, quantity)
  VALUES (?, ?, ?);`;
  const [result] = await connection.execute(query,
    [saleId, productId, quantity]);
  console.log([result]);
  return {
    saleId: result.insertId,
    productId,
    quantity,
  };
};

const updateSales = async (saleId) => {
  const [result] = await connection
    .execute(`
    UPDATE StoreManager.sales_products SET sale_id = ?;`,
      [saleId]);

  return result;
};

const destroySales = async (saleId) => {
  connection.execute('DELETE FROM StoreManager.sales_products WHERE sale_id = ?;', [saleId]);
};  */

module.exports = {
  getAllSales,
  getSalesById,
//  addSales,
//  updateSales,
  destroySales,
};
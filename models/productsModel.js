const connection = require('./connections');

// 01 - Crie endpoint para listar produtos /products /products:id
const getAllProducts = async () => {
  const [results] = await connection.execute('SELECT * FROM StoreManager.products;');
  return results;
};

const getProductsById = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?;', [id]);
  if (!result.length) return null;
  return result[0];
};

// 3 - Crie endpoint para cadastrar produtos

const addProducts = async (name) => {
  const [result] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?);', [name]);
  console.log([result]);
  return {
    id: result.insertId,
    name,
  };
};

// 10 - Crie endpoint para atualizar um produto

const updateProducts = async (name, id) => {
  const [result] = await connection
    .execute(`
    UPDATE StoreManager.products SET name = ? WHERE id = ?;`,
      [name, id]);

  return result;
};

// 12 - crie endpoint para deletar um produto

const destroyProducts = async (id) => {
  connection.execute('DELETE FROM StoreManager.products WHERE id = ?;', [id]);
};
  
module.exports = {
  getAllProducts,
  getProductsById,
  addProducts,
  updateProducts,
  destroyProducts,
};

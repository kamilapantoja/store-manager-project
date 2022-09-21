const express = require('express');

const productsMiddleware = require('../middlewares/validationProduct');
const productsController = require('../controllers/productsController');

const routes = express.Router();

routes.delete('/:id', productsController.destroyProducts);
routes.put('/:id', productsMiddleware.validationProduct, productsController.updateProducts);
routes.post('/', productsMiddleware.validationProduct, productsController.addProducts);
routes.get('/', productsController.getAllProducts);
routes.get('/:id', productsController.getProductsById);

module.exports = routes;
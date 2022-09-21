const express = require('express');

const salesController = require('../controllers/salesController');

const routes = express.Router();

routes.delete('/:id', salesController.destroySales);
// routes.post('/', salesController.addSales);
routes.get('/', salesController.getAllSales);
routes.get('/:id', salesController.getSalesById);

module.exports = routes;
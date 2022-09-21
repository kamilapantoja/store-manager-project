const express = require('express');
require('dotenv/config');

const routes = require('./routes/index');

const app = express();

app.use(express.json());

app.use('/products', routes.productsRoutes);
app.use('/sales', routes.salesRoutes);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
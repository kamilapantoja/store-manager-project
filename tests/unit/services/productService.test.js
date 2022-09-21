const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const productService = require('../../../services/productsServices');
const productModel = require('../../../models/productsModel');

describe('Teste Camada Service', () => {
  describe('Verifica quando não existe nenhuma pessoa criada', () => {
    before(function () {
      sinon.stub(productModel, 'getAllProducts').resolves([]);
    });
    after(function () {
      productModel.getAllProducts.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await productService.getAllProducts();
      expect(result).to.empty;
    });
  });
  describe('Verifica se exitem pessoas criadas', () => {
    before(function () {
      sinon.stub(productModel, 'getAllProducts').resolves([
      {
        "id": 1,
        "name": 'Martelo do Thor',
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do Capitão América"
      }]);
    });
    after(function () {
      productModel.getAllProducts.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await productService.getAllProducts();
      expect(result).to.be.an('array');
    });
    it('Verifica se o array não está vazio', async function () {
      const result = await productService.getAllProducts();
      expect(result).to.not.empty;
    });
    it('Verifica se o array possui itens do tipo objeto', async function () {
      const result = await productService.getAllProducts();
      expect(result[0]).to.be.an('object');
    });
    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productService.getAllProducts();
      expect(result[0]).to.all.keys('id', 'name');
    });

    it('Verifica se é retornado um produto por Id', async () => {
      const result = await productService.getProductsById(1);
      expect(result).to.be.an('object');
      expect(result).to.contain({ id: 1 });
    });
  });
});
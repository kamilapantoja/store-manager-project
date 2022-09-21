const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connections');

const productModel = require('../../../models/productsModel');

describe('Teste da camada Model', () => {
  describe('Verifica quando não existe nenhum produto criado', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(function () {
      connection.execute.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await productModel.getAllProducts();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await productModel.getAllProducts();
      expect(result).to.be.empty;
    });
  });
  describe('Verifica quando existem produtos criados', () => {
    before(function () {
      const resultadoExecute = [[{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 5
      }], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(() => {
      connection.execute.restore();
    })
    it('Verifica se retorna um array', async function () {
      const resultado = await productModel.getAllProducts();
      expect(resultado).to.be.an('array');
    });
    it('Verifica se o array não está vazio', async function () {
      const result = await productModel.getAllProducts();
      expect(result).to.be.not.empty;
    });
    it('Verifica se o array possui itens do tipo objeto', async function () {
      const result = await productModel.getAllProducts();
      expect(result[0]).to.be.an('object');
    });
    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await productModel.getAllProducts();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'name');
    });

    it('Verifica se é retornado um produto por Id', async () => {
      const result = await productModel.getProductsById(1);
      expect(result).to.be.an('object');
      expect(result).to.contain({ id: 1 });
    });
  });
});

const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const connection = require('../../../models/connections');

const salesModel = require('../../../models/salesModel');

describe('SALES - Teste da camada Model', () => {
  describe('Verifica quando não existe nenhuma venda é criado', () => {
    before(function () {
      const resultadoExecute = [[], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(function () {
      connection.execute.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.empty;
    });
  });
  describe('Verifica quando existem vendas criadas', () => {
    before(function () {
      const resultadoExecute = [[{
        id: 1,
        quantity: 1,
      }], []];
      sinon.stub(connection, 'execute').resolves(resultadoExecute);
    });
    after(() => {
      connection.execute.restore();
    })
    it('Verifica se retorna um array', async function () {
      const resultado = await salesModel.getAllSales();
      expect(resultado).to.be.an('array');
    });
    it('Verifica se o array não está vazio', async function () {
      const result = await salesModel.getAllSales();
      expect(result).to.be.not.empty;
    });
    it('Verifica se o array possui itens do tipo objeto', async function () {
      const result = await salesModel.getAllSales();
      expect(result[0]).to.be.an('object');
    });
    it('Verifica se os objetos possuem as propriedades: "id" e "quantity"', async function () {
      const result = await salesModel.getAllSales();
      const item = result[0];
      expect(item).to.include.all.keys('id', 'quantity');
    });
  });
});
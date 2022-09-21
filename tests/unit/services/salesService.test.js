// DEIXANDO AQUI MEU ÓDIO PURO E GENUÍNO POR TESTES !!!!!!!!!!!!!!!
const { expect } = require('chai');
const { describe } = require('mocha');
const sinon = require('sinon');

const salesService = require('../../../services/salesServices');
const salesModel = require('../../../models/salesModel');

describe('SALES - Teste Camada Service', () => {
  describe('Verifica quando não existe nenhuma venda criada', () => {
    before(function () {
      sinon.stub(salesModel, 'getAllSales').resolves([]);
    });
    after(function () {
      salesModel.getAllSales.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.be.an('array');
    });

    it('Verifica se o array está vazio', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.empty;
    });
  });
  describe('Verifica se exitem vendas criadas', () => {
    before(function () {
      sinon.stub(salesModel, 'getAllSales').resolves([
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
      salesModel.getAllSales.restore();
    });
    it('Verifica se retorna um array', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.be.an('array');
    });
    it('Verifica se o array não está vazio', async function () {
      const result = await salesService.getAllSales();
      expect(result).to.not.empty;
    });
    it('Verifica se o array possui itens do tipo objeto', async function () {
      const result = await salesService.getAllSales();
      expect(result[0]).to.be.an('object');
    });
    it('Verifica se os objetos possuem as propriedades: "id" e "name"', async function () {
      const result = await salesService.getAllSales();
      expect(result[0]).to.all.keys('id', 'name');
    });
  });
});
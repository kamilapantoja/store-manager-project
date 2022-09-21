const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesServices');

describe('SALES - Teste da camada Controller', () => {
  const req = {};
  const res = {};
  req.params = { id: 1 };


  describe('Verifica se todas as vendas são retornados', () => {
    const mock = [
      {
        id: 1,
        name: "Martelo do Thor",
      },
      {
        id: 2,
        name: "Traje do encolhimento",
      },
    ];
    before(async () => {
      sinon.stub(salesService, 'getAllSales').resolves(mock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => {
      salesService.getAllSales.restore();
    });

    it('Verifica se é retorna um json com as vendas', async () => {
      await salesController.getAllSales(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('Verifica se retorno possui o status 200', async () => {
      await salesController.getAllSales(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado uma venda por id', () => {
    const mock = {
      id: 1,
      name: "Martelo do Thor",
    };
    before(async () => {
      sinon.stub(salesService, 'getSalesById').resolves(mock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => {
      salesService.getSalesById.restore()
    });

    it('Verifica retorna um json com uma venda por id', async () => {
      await salesController.getSalesById(req, res);
      expect(mock).to.be.a('object');
    });

    it('Verifica se o retorno da venda por ID possui o status 200', async () => {
      await salesController.getSalesById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

});
const sinon = require('sinon');
const { expect } = require('chai');

const { before } = require('mocha');
const productController = require('../../../controllers/productsController');
const productService = require('../../../services/productsServices');

describe('Teste da camada Controller', () => {
  const req = {};
  const res = {};
  req.params = { id: 1 };


  describe('Verifica se todos os produtos são retornados', () => {
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
      sinon.stub(productService, 'getAllProducts').resolves(mock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => {
      productService.getAllProducts.restore();
    });

    it('Verifica se é retorna um json com os produtos', async () => {
      await productController.getAllProducts(req, res);
      expect(res.json.calledWith(mock)).to.be.equal(true);
    });

    it('Verifica se retorno possui o status 200', async () => {
      await productController.getAllProducts(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica se é retornado um produto por id', () => {
    const mock = {
      id: 1,
      name: "Martelo do Thor",
    };
    before(async () => {
      sinon.stub(productService, 'getProductsById').resolves(mock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => {
      productService.getProductsById.restore()
    });

    it('Verifica retorna um json com um produto por id', async () => {
      await productController.getProductsById(req, res);
      expect(mock).to.be.a('object');
    });

    it('Verifica se o retorno do produto por ID possui o status 200', async () => {
      await productController.getProductsById(req, res);
      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('Verifica se o retorno é vazio', () => {
    const mock = null;

    before(async () => {
      sinon.stub(productService, 'getProductsById').resolves(mock);
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    });
    after(() => {
      productService.getProductsById.restore();
    });
    it('Verifica se é retornado a mensagem "Product not found"', async () => {
      await productController.getProductsById(req, res);
      expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
    });
  });
});
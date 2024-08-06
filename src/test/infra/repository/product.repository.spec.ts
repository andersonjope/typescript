import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import Product from "../../../domain/entity/product";
import ProductRepository from "../../../infrastrastructure/repository/product.repository";
import CustomerModel from "../../../infrastrastructure/db/sequelize/model/customer.model";
import OrderItemModel from "../../../infrastrastructure/db/sequelize/model/order.item.model";
import ProductModel from "../../../infrastrastructure/db/sequelize/model/product.model";
import OrderModel from "../../../infrastrastructure/db/sequelize/model/order.model";

describe("Product repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: "memory",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 100);

    await productRepository.create(product);

    let productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    productModel = await ProductModel.findOne({ where: { id: product.id } });

    expect(productModel.toJSON()).toStrictEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    });
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 100);

    await productRepository.create(product);

    const productModel = await ProductModel.findOne({
      where: { id: product.id },
    });

    const foundProduct = await productRepository.find(product.id);

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("Should find all products ", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product(uuid(), "Product 1", 100);
    await productRepository.create(product1);
    const product2 = new Product(uuid(), "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});

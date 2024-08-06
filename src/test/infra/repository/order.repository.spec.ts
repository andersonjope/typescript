import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import CustomerModel from "../../../infrastrastructure/db/sequelize/model/customer.model";
import OrderItemModel from "../../../infrastrastructure/db/sequelize/model/order.item.model";
import ProductModel from "../../../infrastrastructure/db/sequelize/model/product.model";
import CustomerRepository from "../../../infrastrastructure/repository/customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/address";
import ProductRepository from "../../../infrastrastructure/repository/product.repository";
import Product from "../../../domain/entity/product";
import OrderItem from "../../../domain/entity/ordem.item";
import OrderRepository from "../../../infrastrastructure/repository/order.repository";
import Order from "../../../domain/entity/order";
import OrderModel from "../../../infrastrastructure/db/sequelize/model/order.model";

describe("Order repository unit test", () => {
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

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "37610-126");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const productRespository = new ProductRepository();
    const product = new Product(uuid(), "Product 1", 100);
    await productRespository.create(product);

    const orderItem = new OrderItem(
      uuid(),
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order(uuid(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product.id,
        },
      ],
    });
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const productRespository = new ProductRepository();
    const product1 = new Product(uuid(), "Product 1", 100);
    await productRespository.create(product1);

    const orderItem = new OrderItem(
      uuid(),
      product1.name,
      product1.price,
      product1.id,
      2
    );

    let order = new Order(uuid(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product1.id,
        },
      ],
    });

    const product2 = new Product(uuid(), "Product 2", 200);
    await productRespository.create(product2);

    const orderItem1 = new OrderItem(
      uuid(),
      product2.name,
      product2.price,
      product2.id,
      10
    );

    order = new Order(order.id, customer.id, [orderItem, orderItem1]);
    await orderRepository.update(order);

    orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: product1.id,
        },
        {
          id: orderItem1.id,
          name: orderItem1.name,
          price: orderItem1.price,
          quantity: orderItem1.quantity,
          orderId: order.id,
          productId: product2.id,
        },
      ],
    });
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer.setAddress(address);
    await customerRepository.create(customer);

    const productRespository = new ProductRepository();
    const product1 = new Product(uuid(), "Product 1", 100);
    await productRespository.create(product1);

    const orderItem = new OrderItem(
      uuid(),
      product1.name,
      product1.price,
      product1.id,
      2
    );

    let order = new Order(uuid(), customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    let orders = await orderRepository.find(order.id);

    expect(order).toStrictEqual(orders);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer(uuid(), "Customer 1");
    const customer2 = new Customer(uuid(), "Customer 2");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer1.setAddress(address);
    customer2.setAddress(address);
    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const productRespository = new ProductRepository();
    const product1 = new Product(uuid(), "Product 1", 100);
    await productRespository.create(product1);
    const product2 = new Product(uuid(), "Product 2", 100);
    await productRespository.create(product2);

    const orderItem1 = new OrderItem(
      uuid(),
      product1.name,
      product1.price,
      product1.id,
      2
    );

    const orderItem2 = new OrderItem(
      uuid(),
      product2.name,
      product2.price,
      product2.id,
      2
    );

    const order1 = new Order(uuid(), customer1.id, [orderItem1]);
    const order2 = new Order(uuid(), customer2.id, [orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    let orders = await orderRepository.findAll();

    expect(orders).toContainEqual(order1);
    expect(orders).toContainEqual(order2);
  });
});

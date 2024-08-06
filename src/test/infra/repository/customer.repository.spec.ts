import { Sequelize } from "sequelize-typescript";
import { v4 as uuid } from "uuid";
import CustomerModel from "../../../infrastrastructure/db/sequelize/model/customer.model";
import Customer from "../../../domain/entity/customer";
import CustomerRepository from "../../../infrastrastructure/repository/customer.repository";
import Address from "../../../domain/entity/address";
import ProductModel from "../../../infrastrastructure/db/sequelize/model/product.model";
import OrderItemModel from "../../../infrastrastructure/db/sequelize/model/order.item.model";
import OrderModel from "../../../infrastrastructure/db/sequelize/model/order.model";

describe("Customer repository unit test", () => {
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

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer.setAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewarPoints: customer.rewarPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipCode,
      city: customer.address.city,
      state: customer.address.state,
    });
  });

  it("Should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer.setAddress(address);

    await customerRepository.create(customer);

    let customerModel = await CustomerModel.findOne({
      where: { id: customer.id },
    });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewarPoints: customer.rewarPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipCode,
      city: customer.address.city,
      state: customer.address.state,
    });

    customer.changeName("Customer 2");

    await customerRepository.update(customer);

    customerModel = await CustomerModel.findOne({ where: { id: customer.id } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      rewarPoints: customer.rewarPoints,
      street: customer.address.street,
      number: customer.address.number,
      zipcode: customer.address.zipCode,
      city: customer.address.city,
      state: customer.address.state,
    });
  });

  it("Should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(uuid(), "Customer 1");
    const address = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    customer.setAddress(address);

    await customerRepository.create(customer);

    const foundCustomer = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(foundCustomer);
  });
  it("Should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    expect(async () => {
      await customerRepository.find("zpto");
    }).rejects.toThrow("Customer not found");
  });
  it("Should find all customers", async () => {
    const address1 = new Address("Street 1", 100, "City 1", "MG", "71727-104");
    const address2 = new Address("Street 2", 100, "City 2", "MG", "71727-104");

    const customerRepository = new CustomerRepository();
    const customer1 = new Customer(uuid(), "Customer 1");
    customer1.setAddress(address1);
    customer1.addRewarPoints(10);

    await customerRepository.create(customer1);

    const customer2 = new Customer(uuid(), "Customer 2");
    customer2.setAddress(address2);
    customer2.addRewarPoints(10);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});

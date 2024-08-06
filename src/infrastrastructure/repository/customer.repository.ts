import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer.repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zipCode,
      city: entity.address.city,
      active: entity.isActive(),
      rewarPoints: entity.rewarPoints,
      state: entity.address.state,
    });
  }
  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zipCode,
        city: entity.address.city,
        active: entity.isActive(),
        rewarPoints: entity.rewarPoints,
        state: entity.address.state,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }
  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.city,
      customerModel.state,
      customerModel.zipcode
    );

    customer.setAddress(address);
    return customer;
  }
  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      let customer = new Customer(customerModel.id, customerModel.name);
      customer.addRewarPoints(customerModel.rewarPoints);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.city,
        customerModel.state,
        customerModel.zipcode
      );

      customer.setAddress(address);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });

    return customers;
  }
}

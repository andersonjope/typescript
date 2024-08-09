import { v4 as uuid } from "uuid";
import CustomerInterface from "../entity/interface/customer.interface";
import Customer from "../entity/customer";
import Address from "../entity/address";

export default class CustomerFactory {
  static createWithAddress(name: string, address: Address): CustomerInterface {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }

  public static create(name: string): CustomerInterface {
    return new Customer(uuid(), name);
  }
}

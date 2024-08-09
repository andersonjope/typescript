import Address from "../../../domain/entity/address";
import CustomerFactory from "../../../domain/factory/customer.factory";

describe("Customer factory unit test", () => {
  it("Should create a customer", () => {
    const customer = CustomerFactory.create("Customer 1");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBeUndefined();
  });

  it("Should create a customer with an address", () => {
    const address = new Address("Street 1", 10, "City 1", "ST", "64057-153");

    const customer = CustomerFactory.createWithAddress("Customer 1", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.address).toBe(address);
  });
});

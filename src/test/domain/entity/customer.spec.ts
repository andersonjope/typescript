import Address from "../../../domain/entity/address";
import Customer from "../../../domain/entity/customer";

describe("Customer unit test", () => {
  it("should thow erro when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "teste");
    }).toThrow("Id is required");
  });

  it("should thow erro when name is empty", () => {
    expect(() => {
      let customer = new Customer("1", "");
    }).toThrow("Name is required");
  });

  it("should change name", () => {
    let customer = new Customer("1", "Teste 1");

    customer.changeName("Teste 2");

    expect(customer.name).toBe("Teste 2");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Teste 1");
    const address = new Address("Rua um", 2, "unai", "MG", "71727-104");
    customer.setAddress(address);
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should thow error when address is undefined", () => {
    expect(() => {
      const customer = new Customer("1", "Teste 1");
      customer.activate();
    }).toThrow("Invalid address data");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Teste 1");
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Teste 1");
    expect(customer.rewarPoints).toBe(0);

    customer.addRewarPoints(10);
    expect(customer.rewarPoints).toBe(10);

    customer.addRewarPoints(20);
    expect(customer.rewarPoints).toBe(30);
  });
});

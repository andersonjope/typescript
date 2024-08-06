import OrderItem from "../../../domain/entity/ordem.item";
import Order from "../../../domain/entity/order";

describe("Order unit test", () => {
  it("should thow error when id is empty", () => {
    expect(() => {
      let order = new Order("", "10", []);
    }).toThrow("Id is required");
  });

  it("should thow error when customerId is empty ", () => {
    expect(() => {
      let order = new Order("1", "", []);
    }).toThrow("CustomerId is required");
  });

  it("should thow error when Item is empty ", () => {
    expect(() => {
      let order = new Order("1", "10", []);
    }).toThrow("Item qtd must be grater than zero");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "Product 1", 2);
    const item2 = new OrderItem("2", "Item 2", 20, "Product 2", 2);
    const order1 = new Order("1", "1", [item1]);

    let total = order1.total();
    expect(total).toBe(20);

    const order2 = new Order("1", "1", [item2]);
    total = order2.total();
    expect(total).toBe(40);

    const order3 = new Order("1", "1", [item1, item2]);
    total = order3.total();
    expect(total).toBe(60);
  });

  it("should throw error the item qtd is less or equal zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 10, "Product 1", 0);
      const order1 = new Order("1", "1", [item1]);
    }).toThrow("Quantity must be greater than 0");
  });

  it("should throw error the item price is less or equal zero", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 0, "Product 1", 1);
      const order1 = new Order("1", "1", [item1]);
    }).toThrow("Price must be greater than 0");
  });
});

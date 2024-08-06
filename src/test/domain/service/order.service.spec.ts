import { v4 as uuid } from "uuid";
import Customer from "../../../domain/entity/customer";
import OrderItem from "../../../domain/entity/ordem.item";
import Order from "../../../domain/entity/order";
import OrderService from "../../../domain/service/order.service";

describe("Order service unit test", () => {
  it("Should get total of all orders", () => {
    const item1 = new OrderItem(uuid(), "Item 1", 10, "p1", 2);
    const item2 = new OrderItem(uuid(), "Item 1", 10, "p1", 2);

    const order1 = new Order(uuid(), uuid(), [item1]);
    const order2 = new Order(uuid(), uuid(), [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(40);
  });

  it("Should place an order", () => {
    const customer = new Customer(uuid(), "C1");
    const item1 = new OrderItem(uuid(), "Item 1", 10, "p1", 2);

    const order1 = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewarPoints).toBe(10);
    expect(order1.total()).toBe(20);
  });
});

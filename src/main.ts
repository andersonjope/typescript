import Address from "./domain/entity/address";
import Customer from "./domain/entity/customer";
import OrderItem from "./domain/entity/ordem.item";
import Order from "./domain/entity/order";

let customer = new Customer("123", "Teste");
const address = new Address("Rua um", 2, "unai", "Minas", "71727-104");
customer.setAddress(address);

const item1 = new OrderItem("1", "Item 1", 10, "p1", 1);
const item2 = new OrderItem("2", "Item 2", 10, "p2", 2);

const order = new Order("1", "1", [item1, item2]);

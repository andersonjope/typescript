import { v4 as uuid } from "uuid";
import Product from "../../../domain/entity/product";
import ProductService from "../../../domain/service/product.service";

describe("Product service unit test", () => {
  it("Should change the prices of all products", () => {
    const product1 = new Product(uuid(), "Product 1", 10);
    const product2 = new Product(uuid(), "Product 2", 20);
    const products = [product1, product2];

    ProductService.increasePrice(products, 100);

    expect(product1.price).toBe(20);
    expect(product2.price).toBe(40);
  });
});

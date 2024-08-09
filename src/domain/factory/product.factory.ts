import { v4 as uuid } from "uuid";
import Product from "../entity/product";
import ProductInterface from "../entity/interface/product.interface";

export default class ProductFactory {
  public static create(
    type: string,
    name: string,
    price: number
  ): ProductInterface {
    switch (type) {
      case "A":
        return new Product(uuid(), name, price);
      case "B":
        return new Product(uuid(), name, price);
      default:
        throw new Error("Product type not supported");
    }
  }
}

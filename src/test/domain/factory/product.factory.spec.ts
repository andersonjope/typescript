import ProductFactory from "../../../domain/factory/product.factory";

describe("Product factory unit test", () => {
  it("Should create a product type A", () => {
    const product = ProductFactory.create("A", "Product A", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });
  it("Should create a product type B", () => {
    const product = ProductFactory.create("B", "Product B", 10);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(10);
    expect(product.constructor.name).toBe("Product");
  });

  it("Should create a product type C", () => {
    expect(() => ProductFactory.create("C", "Product B", 10)).toThrow(
      "Product type not supported"
    );
  });
});

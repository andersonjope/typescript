import Product from "../../../domain/entity/product";

describe("Product unit test", () => {
  it("should thow error when id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 10);
    }).toThrow("Id is empty");
  });

  it("should thow error when name is empty", () => {
    expect(() => {
      const product = new Product("1", "", 10);
    }).toThrow("Name is empty");
  });

  it("should thow error when price less than zero", () => {
    expect(() => {
      const product = new Product("1", "Product 1", -1);
    }).toThrow("Price is zero");
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 10);
    product.changeName("Product 2");

    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 10);
    product.changePrice(20);

    expect(product.price).toBe(20);
  });
});

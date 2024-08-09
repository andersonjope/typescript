import ProductInterface from "./interface/product.interface";

export default class Product implements ProductInterface {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate(): boolean {
    if (this._id.length === 0) {
      throw new Error("Id is empty");
    }
    if (this._name.length === 0) {
      throw new Error("Name is empty");
    }
    if (this._price <= 0) {
      throw new Error("Price is zero");
    }
    return true;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  get price(): number {
    return this._price;
  }
}

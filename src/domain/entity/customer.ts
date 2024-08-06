import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private active = true;
  private _rewarPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  setAddress(address: Address) {
    this._address = address;
  }

  public get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get rewarPoints(): number {
    return this._rewarPoints;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Invalid address data");
    }
    this.active = true;
  }

  deactivate() {
    this.active = false;
  }

  isActive(): boolean {
    return this.active;
  }

  addRewarPoints(point: number) {
    this._rewarPoints += point;
  }

  public get address(): Address {
    return this._address;
  }
}

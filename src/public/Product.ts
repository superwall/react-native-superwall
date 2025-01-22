export class Product {
  name?: string;
  id: string;

  constructor({ id, name }: { id: string; name?: string }) {
    this.id = id;
    this.name = name;
  }

  // Factory method to create a Product instance from a JSON object
  static fromJson(json: { [key: string]: any }): Product {
    return new Product({
      id: json.id,
      name: json.name,
    });
  }
}

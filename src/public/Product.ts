import { Entitlement } from './Entitlement';

export class Product {
  name?: string;
  id: string;
  entitlements: Set<Entitlement>;

  constructor({
    id,
    name,
    entitlements,
  }: {
    id: string;
    name?: string;
    entitlements: Set<Entitlement>;
  }) {
    this.id = id;
    this.name = name;
    this.entitlements = entitlements;
  }

  // Factory method to create a Product instance from a JSON object
  static fromJson(json: { [key: string]: any }): Product {
    return new Product({
      id: json.id,
      name: json.name,
      entitlements: new Set<Entitlement>(
        Array.isArray(json.entitlements)
          ? json.entitlements.map((item: any) => Entitlement.fromJson(item))
          : []
      ),
    });
  }
}

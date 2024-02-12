export enum ProductType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export class Product {
  type: ProductType;
  id: string;

  constructor({ type, id }: { type: ProductType; id: string }) {
    this.type = type;
    this.id = id;
  }

  // Factory method to create a Product instance from a JSON object
  static fromJson(json: { [key: string]: any }): Product {
    return new Product({
      type: ProductType.fromJson(json.type),
      id: json.id,
    });
  }
}

// Utility class for ProductType serialization and deserialization
export namespace ProductType {
  // Converts the enum to a JSON-valid string
  export function toJson(type: ProductType): string {
    switch (type) {
      case ProductType.Primary:
        return 'primary';
      case ProductType.Secondary:
        return 'secondary';
      case ProductType.Tertiary:
        return 'tertiary';
      default:
        throw new Error('Invalid ProductType value');
    }
  }

  // Parses a JSON string to get the corresponding ProductType enum value
  export function fromJson(json: string): ProductType {
    switch (json) {
      case 'primary':
        return ProductType.Primary;
      case 'secondary':
        return ProductType.Secondary;
      case 'tertiary':
        return ProductType.Tertiary;
      default:
        throw new Error(`Invalid ProductType value: ${json}`);
    }
  }
}

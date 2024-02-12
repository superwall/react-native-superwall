export enum VariantType {
  treatment = 'treatment',
  holdout = 'holdout',
}

// Utilize a namespace to add static methods for JSON conversion
export namespace VariantType {
  export function toJson(type: VariantType): string {
    return type;
  }

  export function fromJson(json: string): VariantType {
    if (!Object.values(VariantType).includes(json as VariantType)) {
      throw new Error(`Invalid VariantType value: ${json}`);
    }
    return json as VariantType;
  }
}

export class Variant {
  id: string;
  type: VariantType;
  paywallId?: string;

  constructor(id: string, type: VariantType, paywallId?: string) {
    this.id = id;
    this.type = type;
    this.paywallId = paywallId;
  }

  static fromJson(json: any): Variant {
    return new Variant(
      json.id,
      VariantType.fromJson(json.type),
      json.paywallId
    );
  }

  toJson(): { [key: string]: any } {
    return {
      id: this.id,
      type: VariantType.toJson(this.type),
      paywallId: this.paywallId,
    };
  }
}

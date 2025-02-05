export class Entitlement {
  // The entitlement's identifier.
  id: string;
  // The entitlement's type.
  type: string;

  /**
   * Creates an instance of Entitlement.
   * @param id - The entitlement's identifier.
   * @param type - The entitlement's type.
   */
  constructor(id: string, type: string) {
    this.id = id;
    this.type = type;
  }

  static fromJson(json: any): Entitlement {
    return new Entitlement(json.id, json.type);
  }
}

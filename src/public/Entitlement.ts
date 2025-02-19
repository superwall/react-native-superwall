export class Entitlement {
  // The entitlement's identifier.
  id: string;
  // The entitlement's type.
  type: string;

  /**
   * Creates an instance of Entitlement.
   * @param id - The entitlement's identifier.
   */
  constructor(id: string) {
    this.id = id;
    this.type = 'SERVICE_LEVEL';
  }

  static fromJson(json: any): Entitlement {
    return Entitlement.create(json.id, json.type);
  }

  /**
   * Creates an Entitlement instance from id and type strings.
   * @param id - The entitlement's identifier.
   * @param type - The entitlement's type.
   * @returns A new Entitlement instance.
   */
  static create(id: string, type: string): Entitlement {
    let e = new Entitlement(id);
    e.type = type;
    return e;
  }
}

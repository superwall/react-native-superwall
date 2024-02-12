export class TransactionProduct {
  id: string;

  constructor(id: string) {
    this.id = id;
  }

  static fromJson(json: any): TransactionProduct {
    return new TransactionProduct(json.id);
  }

  toJson(): { [key: string]: any } {
    return {
      id: this.id,
    };
  }
}

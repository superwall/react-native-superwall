export enum PurchaseResultType {
  Cancelled,
  Purchased,
  Pending,
  Restored,
  Failed, // We'll handle the error message separately since enums can't directly store data
}

// Define a class for PurchaseResult that can handle the additional data for Failed results
export class PurchaseResult {
  constructor(public type: PurchaseResultType, public errorMessage?: string) {}

  // Static method to create a Failed result with an error message
  static failed(errorMessage: string) {
    return new PurchaseResult(PurchaseResultType.Failed, errorMessage);
  }
}

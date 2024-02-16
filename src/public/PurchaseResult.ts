// Base class
export class PurchaseResult {
  constructor(public type: string, public error?: string) {}

  toJSON() {
    return {
      type: this.type,
      ...(this.error && { error: this.error }), // Conditionally add error field if present
    };
  }
}

// Derived classes for specific purchase results
export class PurchaseResultCancelled extends PurchaseResult {
  constructor() {
    super('cancelled');
  }
}

export class PurchaseResultPurchased extends PurchaseResult {
  constructor() {
    super('purchased');
  }
}

export class PurchaseResultRestored extends PurchaseResult {
  constructor() {
    super('restored');
  }
}

export class PurchaseResultPending extends PurchaseResult {
  constructor() {
    super('pending');
  }
}

export class PurchaseResultFailed extends PurchaseResult {
  constructor(error: string) {
    super('failed', error);
  }
}

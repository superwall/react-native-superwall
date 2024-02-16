export abstract class RestorationResult {
  abstract toJson(): Object;

  static restored() {
    return new Restored();
  }

  static failed(error?: Error) {
    return new Failed(error);
  }
}

export class Restored extends RestorationResult {
  toJson() {
    return { result: 'restored' };
  }
}

export class Failed extends RestorationResult {
  constructor(public error?: Error) {
    super();
  }

  toJson() {
    return {
      result: 'failed',
      errorMessage: this.error ? this.error.message : null,
    };
  }
}

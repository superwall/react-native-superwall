// Define an abstract class for RestorationResult to act as a base class
export abstract class RestorationResult {
  // Static method to create a Restored instance
  static restored() {
    return new Restored();
  }

  // Static method to create a Failed instance with an optional error
  static failed(error?: Error) {
    return new Failed(error);
  }
}

// Define a class for the Restored case
export class Restored extends RestorationResult {}

// Define a class for the Failed case, including an optional error property
export class Failed extends RestorationResult {
  constructor(public error?: Error) {
    super();
  }
}

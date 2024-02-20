export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  UNKNOWN = 'UNKNOWN',
}

export namespace SubscriptionStatus {
  export function fromString(value: string): SubscriptionStatus {
    switch (value) {
      case 'ACTIVE':
        return SubscriptionStatus.ACTIVE;
      case 'INACTIVE':
        return SubscriptionStatus.INACTIVE;
      case 'UNKNOWN':
        return SubscriptionStatus.UNKNOWN;
      default:
        return SubscriptionStatus.UNKNOWN;
    }
  }
}

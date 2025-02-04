import type { Entitlement } from './Entitlement';

export enum SubscriptionStatus {
  UNKNOWN = 'UNKNOWN',
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export namespace SubscriptionStatus {
  export function fromString(
    value: string,
    entitlements: Entitlement[]
  ): { status: SubscriptionStatus; entitlements: Entitlement[] } {
    switch (value) {
      case 'ACTIVE':
        return {
          status: SubscriptionStatus.ACTIVE,
          entitlements,
        };
      case 'INACTIVE':
        return {
          status: SubscriptionStatus.INACTIVE,
          entitlements: [],
        };
      case 'UNKNOWN':
      default:
        return {
          status: SubscriptionStatus.UNKNOWN,
          entitlements: [],
        };
    }
  }

  export function fromJson(json: any): {
    status: SubscriptionStatus;
    entitlements: Entitlement[];
  } {
    switch (json.status) {
      case 'ACTIVE':
        return {
          status: SubscriptionStatus.ACTIVE,
          entitlements: json.entitlements,
        };
      case 'INACTIVE':
        return {
          status: SubscriptionStatus.INACTIVE,
          entitlements: [],
        };
      case 'UNKNOWN':
      default:
        return {
          status: SubscriptionStatus.UNKNOWN,
          entitlements: [],
        };
    }
  }
}

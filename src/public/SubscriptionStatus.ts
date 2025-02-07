import type { Entitlement } from './Entitlement';

export type SubscriptionStatus =
  | SubscriptionStatus.Active
  | SubscriptionStatus.Inactive
  | SubscriptionStatus.Unknown;

export namespace SubscriptionStatus {
  export type Active = {
    status: `ACTIVE`;
    entitlements: Entitlement[];
  };

  export type Inactive = {
    status: `INACTIVE`;
  };

  export type Unknown = {
    status: `UNKNOWN`;
  };

  export function fromString(
    value: string,
    entitlements: Entitlement[]
  ): SubscriptionStatus {
    switch (value) {
      case 'ACTIVE':
        return {
          status: 'ACTIVE',
          entitlements,
        };
      case 'INACTIVE':
        return {
          status: 'INACTIVE',
        };
      case 'UNKNOWN':
      default:
        return {
          status: 'UNKNOWN',
        };
    }
  }

  export function fromJson(json: any): SubscriptionStatus {
    switch (json.status) {
      case 'ACTIVE':
        return {
          status: 'ACTIVE',
          entitlements: json.entitlements,
        };
      case 'INACTIVE':
        return {
          status: 'INACTIVE',
        };
      case 'UNKNOWN':
      default:
        return {
          status: 'UNKNOWN',
        };
    }
  }
}

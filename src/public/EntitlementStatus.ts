import type { Entitlement } from './Entitlement';

export enum EntitlementStatus {
  UNKNOWN = 'UNKNOWN',
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
}

export namespace EntitlementStatus {
  export function fromString(
    value: string,
    entitlements: Entitlement[]
  ): { status: EntitlementStatus; entitlements: Entitlement[] } {
    switch (value) {
      case 'ACTIVE':
        return {
          status: EntitlementStatus.ACTIVE,
          entitlements,
        };
      case 'INACTIVE':
        return {
          status: EntitlementStatus.INACTIVE,
          entitlements: [],
        };
      case 'UNKNOWN':
      default:
        return {
          status: EntitlementStatus.UNKNOWN,
          entitlements: [],
        };
    }
  }

  export function fromJson(json: any): {
    status: EntitlementStatus;
    entitlements: Entitlement[];
  } {
    switch (json.status) {
      case 'ACTIVE':
        return {
          status: EntitlementStatus.ACTIVE,
          entitlements: json.entitlements,
        };
      case 'INACTIVE':
        return {
          status: EntitlementStatus.INACTIVE,
          entitlements: [],
        };
      case 'UNKNOWN':
      default:
        return {
          status: EntitlementStatus.UNKNOWN,
          entitlements: [],
        };
    }
  }
}

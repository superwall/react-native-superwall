import type { Entitlement } from './Entitlement';
import { SubscriptionStatus } from './SubscriptionStatus';

export interface EntitlementsInfo {
  status: { status: SubscriptionStatus; entitlements: Entitlement[] };
  active: Entitlement[];
  all: Entitlement[];
  inactive: Entitlement[];
}

// Utility functions for EntitlementsInfo
export namespace EntitlementsInfo {
  export function fromObject(obj: any): EntitlementsInfo {
    return {
      status: SubscriptionStatus.fromString(obj.status, obj.active),
      active: obj.active,
      all: obj.all,
      inactive: obj.inactive,
    };
  }
}

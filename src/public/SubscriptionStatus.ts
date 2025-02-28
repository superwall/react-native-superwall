import { Entitlement } from './Entitlement';

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

  export function Active(input: Entitlement[] | string[]): Active {
    return {
      status: `ACTIVE`,
      entitlements:
        input.length === 0
          ? []
          : typeof input[0] === 'string'
          ? (input as string[]).map((id) => new Entitlement(id))
          : (input as Entitlement[]),
    };
  }

  export function Inactive(): Inactive {
    return {
      status: 'INACTIVE',
    };
  }

  export function Unknown(): Unknown {
    return {
      status: 'UNKNOWN',
    };
  }

  export function fromString(
    value: string,
    entitlements: Entitlement[]
  ): SubscriptionStatus {
    switch (value) {
      case 'ACTIVE':
        return Active(entitlements);
      case 'INACTIVE':
        return Inactive();
      case 'UNKNOWN':
      default:
        return Unknown();
    }
  }

  export function fromJson(json: any): SubscriptionStatus {
    switch (json.status) {
      case 'ACTIVE':
        return {
          status: 'ACTIVE',
          entitlements: json.entitlements.map((entitlement: any) =>
            Entitlement.fromJson(entitlement)
          ),
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

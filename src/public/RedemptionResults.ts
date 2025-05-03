/**
 * RedemptionResult and related types
 * Corresponds to the Swift RedemptionResult enum and its associated types
 */

import { Entitlement } from './Entitlement';

/**
 * Information about an error that occurred during code redemption
 */
export interface ErrorInfo {
  /** The error message */
  message: string;
}

/**
 * Information about an expired redemption code
 */
export interface ExpiredCodeInfo {
  /** Whether the redemption email was resent */
  resent: boolean;
  /** Optional obfuscated email address that the redemption email was sent to */
  obfuscatedEmail?: string;
}

/**
 * Represents the ownership of a redemption code
 */
export type Ownership =
  | { type: 'APP_USER'; appUserId: string }
  | { type: 'DEVICE'; deviceId: string };

/**
 * Store identifiers for the purchase
 */
export type StoreIdentifiers =
  | {
      store: 'STRIPE';
      stripeCustomerId: string;
      stripeSubscriptionIds: string[];
    }
  | { store: string; [key: string]: any }; // For unknown store types

/**
 * Information about the purchaser
 */
export interface PurchaserInfo {
  /** The app user ID of the purchaser */
  appUserId: string;
  /** The email address of the purchaser (optional) */
  email?: string;
  /** The identifiers for the store the purchase was made from */
  storeIdentifiers: StoreIdentifiers;
}

/**
 * Information about the paywall the purchase was made from
 */
export interface PaywallInfo {
  /** The identifier of the paywall */
  identifier: string;
  /** The name of the placement */
  placementName: string;
  /** The params of the placement */
  placementParams: Record<string, any>;
  /** The ID of the paywall variant */
  variantId: string;
  /** The ID of the experiment that the paywall belongs to */
  experimentId: string;
}

/**
 * Information about a successful redemption
 */
export interface RedemptionInfo {
  /** The ownership of the code */
  ownership: Ownership;
  /** Information about the purchaser */
  purchaserInfo: PurchaserInfo;
  /** Information about the paywall the purchase was made from (optional) */
  paywallInfo?: PaywallInfo;
  /** The entitlements granted by the redemption */
  entitlements: Entitlement[];
}

/**
 * The result of redeeming a code via web checkout
 */
export type RedemptionResult =
  | { status: 'SUCCESS'; code: string; redemptionInfo: RedemptionInfo }
  | { status: 'ERROR'; code: string; error: ErrorInfo }
  | { status: 'CODE_EXPIRED'; code: string; expired: ExpiredCodeInfo }
  | { status: 'INVALID_CODE'; code: string }
  | {
      status: 'EXPIRED_SUBSCRIPTION';
      code: string;
      redemptionInfo: RedemptionInfo;
    };

/**
 * Static methods for working with RedemptionResult
 */
export class RedemptionResults {
  static fromJson(json: any): RedemptionResult {
    const { status, code } = json;

    switch (status) {
      case 'SUCCESS':
        return {
          status,
          code,
          redemptionInfo: this.parseRedemptionInfo(json.redemptionInfo),
        };

      case 'ERROR':
        return {
          status,
          code,
          error: {
            message: json.error.message,
          },
        };

      case 'CODE_EXPIRED':
        return {
          status,
          code,
          expired: {
            resent: json.expired.resent,
            obfuscatedEmail: json.expired.obfuscatedEmail,
          },
        };

      case 'INVALID_CODE':
        return {
          status,
          code,
        };

      case 'EXPIRED_SUBSCRIPTION':
        return {
          status,
          code,
          redemptionInfo: this.parseRedemptionInfo(json.redemptionInfo),
        };

      default:
        throw new Error(`Unknown RedemptionResult status: ${status}`);
    }
  }

  private static parseRedemptionInfo(json: any): RedemptionInfo {
    const result: RedemptionInfo = {
      ownership: this.parseOwnership(json.ownership),
      purchaserInfo: this.parsePurchaserInfo(json.purchaserInfo),
      entitlements: Array.isArray(json.entitlements)
        ? json.entitlements.map((e: any) => Entitlement.fromJson(e))
        : [],
    };

    if (json.paywallInfo) {
      result.paywallInfo = {
        identifier: json.paywallInfo.identifier,
        placementName: json.paywallInfo.placementName,
        placementParams: json.paywallInfo.placementParams || {},
        variantId: json.paywallInfo.variantId,
        experimentId: json.paywallInfo.experimentId,
      };
    }

    return result;
  }
  private static parseOwnership(json: any): Ownership {
    switch (json.type) {
      case 'APP_USER':
        return {
          type: 'APP_USER',
          appUserId: json.appUserId,
        };

      case 'DEVICE':
        return {
          type: 'DEVICE',
          deviceId: json.deviceId,
        };

      default:
        throw new Error(`Unknown ownership type: ${json.type}`);
    }
  }

  private static parsePurchaserInfo(json: any): PurchaserInfo {
    const result: PurchaserInfo = {
      appUserId: json.appUserId,
      storeIdentifiers: this.parseStoreIdentifiers(json.storeIdentifiers),
    };

    if (json.email) {
      result.email = json.email;
    }

    return result;
  }

  private static parseStoreIdentifiers(json: any): StoreIdentifiers {
    if (json.store === 'STRIPE') {
      return {
        store: 'STRIPE',
        stripeCustomerId: json.stripeCustomerId,
        stripeSubscriptionIds: json.stripeSubscriptionIds || [],
      };
    }

    return { ...json };
  }
}

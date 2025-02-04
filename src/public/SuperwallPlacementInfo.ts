import type { Entitlement } from './Entitlement';
import { SubscriptionStatus } from './SubscriptionStatus';
import { PaywallInfo } from "./PaywallInfo";
import {
  PaywallPresentationRequestStatus,
  PaywallPresentationRequestStatusReason,
} from './PaywallPresentationRequestStatus';
import { RestoreType } from "./RestoreType";
import { StoreProduct } from "./StoreProduct";
import { StoreTransaction } from "./StoreTransaction";
import { Survey, SurveyOption } from "./Survey";
import { TriggerResult } from "./TriggerResult";

export class SuperwallPlacementInfo {
  placement: SuperwallPlacement;
  params?: Record<string, any>;

  constructor(placement: SuperwallPlacement, params?: Record<string, any>) {
    this.placement = placement;
    this.params = params;
  }

  static fromJson(json: any): SuperwallPlacementInfo {
    return new SuperwallPlacementInfo(
      SuperwallPlacement.fromJson(json.placement),
      json.params
    );
  }
}

export enum PlacementType {
  firstSeen = "firstSeen",
  configRefresh = "configRefresh",
  appOpen = "appOpen",
  appLaunch = "appLaunch",
  identityAlias = "identityAlias",
  appInstall = "appInstall",
  sessionStart = "sessionStart",
  deviceAttributes = "deviceAttributes",
  subscriptionStatusDidChange = "subscriptionStatusDidChange",
  appClose = "appClose",
  deepLink = "deepLink",
  triggerFire = "triggerFire",
  paywallOpen = "paywallOpen",
  paywallClose = "paywallClose",
  paywallDecline = "paywallDecline",
  transactionStart = "transactionStart",
  transactionFail = "transactionFail",
  transactionAbandon = "transactionAbandon",
  transactionComplete = "transactionComplete",
  subscriptionStart = "subscriptionStart",
  freeTrialStart = "freeTrialStart",
  transactionRestore = "transactionRestore",
  transactionTimeout = "transactionTimeout",
  userAttributes = "userAttributes",
  nonRecurringProductPurchase = "nonRecurringProductPurchase",
  paywallResponseLoadStart = "paywallResponseLoadStart",
  paywallResponseLoadNotFound = "paywallResponseLoadNotFound",
  paywallResponseLoadFail = "paywallResponseLoadFail",
  paywallResponseLoadComplete = "paywallResponseLoadComplete",
  paywallWebviewLoadStart = "paywallWebviewLoadStart",
  paywallWebviewLoadFail = "paywallWebviewLoadFail",
  paywallWebviewLoadComplete = "paywallWebviewLoadComplete",
  paywallWebviewLoadTimeout = "paywallWebviewLoadTimeout",
  paywallWebviewLoadFallback = "paywallWebviewLoadFallback",
  paywallProductsLoadStart = "paywallProductsLoadStart",
  paywallProductsLoadFail = "paywallProductsLoadFail",
  paywallProductsLoadComplete = "paywallProductsLoadComplete",
  paywallProductsLoadRetry = "paywallProductsLoadRetry",
  surveyResponse = "surveyResponse",
  paywallPresentationRequest = "paywallPresentationRequest",
  touchesBegan = "touchesBegan",
  surveyClose = "surveyClose",
  reset = "reset",
  restoreStart = "restoreStart",
  restoreComplete = "restoreComplete",
  restoreFail = "restoreFail",
  configAttributes = "configAttributes",
  customPlacement = "customPlacement",
  errorThrown = "errorThrown",
  confirmAllAssignments = "confirmAllAssignments",
  configFail = "configFail",
  adServicesTokenRequestStart = "adServicesTokenRequestStart",
  adServicesTokenRequestFail = "adServicesTokenRequestFail",
  adServicesTokenRequestComplete = "adServicesTokenRequestComplete",
  shimmerViewStart = "shimmerViewStart",
  shimmerViewComplete = "shimmerViewComplete"
}

export class SuperwallPlacement {
  type: PlacementType | undefined;
  placementName?: string;
  deviceAttributes?: Record<string, any>;
  deepLinkUrl?: string;
  result?: TriggerResult;
  paywallInfo?: PaywallInfo;
  transaction?: StoreTransaction;
  product?: StoreProduct;
  error?: string;
  message?: string;
  triggeredEventName?: string;
  survey?: Survey;
  selectedOption?: SurveyOption;
  customResponse?: string;
  status?: PaywallPresentationRequestStatus;
  reason?: PaywallPresentationRequestStatusReason;
  restoreType?: RestoreType;
  userAttributes?: Record<string, any>;

  private constructor(options: {
    type: PlacementType;
    placementName?: string;
    deviceAttributes?: Record<string, any>;
    deepLinkUrl?: string;
    result?: TriggerResult;
    paywallInfo?: PaywallInfo;
    transaction?: StoreTransaction;
    product?: StoreProduct;
    error?: string;
    message?: string;
    triggeredEventName?: string;
    survey?: Survey;
    selectedOption?: SurveyOption;
    customResponse?: string;
    status?: PaywallPresentationRequestStatus;
    reason?: PaywallPresentationRequestStatusReason;
    restoreType?: RestoreType;
    userAttributes?: Record<string, any>;
    attempt?: number;
    name?: string;
    params?: Record<string, any>;
    token?: string;
    from?: { status: SubscriptionStatus; entitlements: Entitlement[] };
    to?: { status: SubscriptionStatus; entitlements: Entitlement[] };
  }) {
    Object.assign(this, options);
  }

  static fromJson(json: any): SuperwallPlacement {
    let placementType =
      PlacementType[json.placement as keyof typeof PlacementType];

    // Example for one case, replicate logic for other cases as needed
    switch (placementType) {
      case PlacementType.configRefresh:
      case PlacementType.firstSeen:
      case PlacementType.appOpen:
      case PlacementType.appLaunch:
      case PlacementType.identityAlias:
      case PlacementType.appInstall:
      case PlacementType.sessionStart:
      case PlacementType.appClose:
      case PlacementType.touchesBegan:
      case PlacementType.surveyClose:
      case PlacementType.reset:
      case PlacementType.restoreStart:
      case PlacementType.restoreComplete:
      case PlacementType.configAttributes:
      case PlacementType.configFail:
      case PlacementType.adServicesTokenRequestStart:
      case PlacementType.errorThrown:
      case PlacementType.confirmAllAssignments:
      case PlacementType.shimmerViewStart:
      case PlacementType.shimmerViewComplete:
      case PlacementType.subscriptionStatusDidChange:
        return new SuperwallPlacement({ type: placementType });
      case PlacementType.restoreFail:
        return new SuperwallPlacement({
          type: placementType,
          message: json.message,
        });
      case PlacementType.deviceAttributes:
        return new SuperwallPlacement({
          type: placementType,
          deviceAttributes: json.attributes,
        });
      case PlacementType.deepLink:
        return new SuperwallPlacement({
          type: placementType,
          deepLinkUrl: json.url,
        });
      case PlacementType.triggerFire:
        return new SuperwallPlacement({
          type: placementType,
          placementName: placementType,
          result: TriggerResult.fromJson(json.result),
        });
      case PlacementType.paywallOpen:
      case PlacementType.paywallClose:
      case PlacementType.paywallDecline:
      case PlacementType.transactionRestore:
      case PlacementType.paywallWebviewLoadStart:
      case PlacementType.paywallWebviewLoadFail:
      case PlacementType.paywallWebviewLoadComplete:
      case PlacementType.paywallWebviewLoadTimeout:
      case PlacementType.paywallWebviewLoadFallback:
        return new SuperwallPlacement({
          type: placementType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.transactionStart:
      case PlacementType.transactionAbandon:
      case PlacementType.subscriptionStart:
      case PlacementType.freeTrialStart:
      case PlacementType.nonRecurringProductPurchase:
        return new SuperwallPlacement({
          type: placementType,
          product: StoreProduct.fromJson(json.product),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.transactionFail:
        return new SuperwallPlacement({
          type: placementType,
          error: json.error,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.transactionComplete:
        return new SuperwallPlacement({
          type: placementType,
          transaction: json.transaction
            ? StoreTransaction.fromJson(json.transaction)
            : undefined,
          product: StoreProduct.fromJson(json.product),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.transactionRestore:
        return new SuperwallPlacement({
          type: placementType,
          restoreType: RestoreType.fromJson(json.restoreType),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.userAttributes:
        return new SuperwallPlacement({
          type: placementType,
          userAttributes: json.attributes,
        });
      case PlacementType.paywallResponseLoadStart:
      case PlacementType.paywallResponseLoadNotFound:
      case PlacementType.paywallResponseLoadFail:
        return new SuperwallPlacement({
          type: placementType,
          triggeredEventName: json.triggeredEventName,
        });
      case PlacementType.paywallResponseLoadComplete:
      case PlacementType.paywallProductsLoadStart:
      case PlacementType.paywallProductsLoadFail:
      case PlacementType.paywallProductsLoadComplete:
        return new SuperwallPlacement({
          type: placementType,
          triggeredEventName: json.triggeredEventName,
        });
      case PlacementType.paywallProductsLoadRetry:
        return new SuperwallPlacement({
          type: placementType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
          triggeredEventName: json.triggeredEventName,
          attempt: json.attempt,
        });
      case PlacementType.surveyResponse:
        return new SuperwallPlacement({
          type: placementType,
          survey: Survey.fromJson(json.survey),
          selectedOption: SurveyOption.fromJson(json.selectedOption),
          customResponse: json.customResponse,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.paywallPresentationRequest:
        return new SuperwallPlacement({
          type: placementType,
          status: PaywallPresentationRequestStatus.fromJson(json.status),
          reason: json.reason
            ? PaywallPresentationRequestStatusReason.fromJson(json.reason)
            : undefined,
        });
      case PlacementType.customPlacement:
        return new SuperwallPlacement({
          type: placementType,
          name: json.name,
          params: json.params,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case PlacementType.adServicesTokenRequestFail:
        return new SuperwallPlacement({
          type: placementType,
          error: json.error,
        });
      case PlacementType.adServicesTokenRequestComplete:
        return new SuperwallPlacement({
          type: placementType,
          token: json.token,
        });
      case PlacementType.transactionTimeout:
        return new SuperwallPlacement({
          type: placementType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      // Further cases would follow a similar pattern, handling additional properties as needed
      // For complex nested objects like 'result', 'paywallInfo', etc., you would use the corresponding fromJson methods
      default:
        throw new Error('Invalid placement type');
    }
  }
}

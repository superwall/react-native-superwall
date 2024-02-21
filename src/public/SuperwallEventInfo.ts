import { PaywallInfo } from "./PaywallInfo";
import { PaywallPresentationRequestStatus, PaywallPresentationRequestStatusReason } from "./PaywallPresentationRequestStatus";
import { RestoreType } from "./RestoreType";
import { StoreProduct } from "./StoreProduct";
import { StoreTransaction } from "./StoreTransaction";
import { Survey, SurveyOption } from "./Survey";
import { TriggerResult } from "./TriggerResult";

export class SuperwallEventInfo {
  event: SuperwallEvent;
  params?: Record<string, any>;

  constructor(event: SuperwallEvent, params?: Record<string, any>) {
    this.event = event;
    this.params = params;
  }

  static fromJson(json: any): SuperwallEventInfo {
    return new SuperwallEventInfo(
      SuperwallEvent.fromJson(json.event),
      json.params
    );
  }
}

export enum EventType {
  firstSeen = "firstSeen",
  appOpen = "appOpen",
  appLaunch = "appLaunch",
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
  paywallProductsLoadStart = "paywallProductsLoadStart",
  paywallProductsLoadFail = "paywallProductsLoadFail",
  paywallProductsLoadComplete = "paywallProductsLoadComplete",
  surveyResponse = "surveyResponse",
  paywallPresentationRequest = "paywallPresentationRequest",
  touchesBegan = "touchesBegan",
  surveyClose = "surveyClose",
  reset = "reset",
}

export class SuperwallEvent {
  type: EventType | undefined;
  eventName?: string;
  deviceAttributes?: Record<string, any>;
  deepLinkUrl?: string;
  result?: TriggerResult;
  paywallInfo?: PaywallInfo;
  transaction?: StoreTransaction;
  product?: StoreProduct;
  error?: string;
  triggeredEventName?: string;
  survey?: Survey;
  selectedOption?: SurveyOption;
  customResponse?: string;
  status?: PaywallPresentationRequestStatus;
  reason?: PaywallPresentationRequestStatusReason;
  restoreType?: RestoreType;
  userAttributes?: Record<string, any>;

  private constructor(options: {
    type: EventType;
    eventName?: string;
    deviceAttributes?: Record<string, any>;
    deepLinkUrl?: string;
    result?: TriggerResult;
    paywallInfo?: PaywallInfo;
    transaction?: StoreTransaction;
    product?: StoreProduct;
    error?: string;
    triggeredEventName?: string;
    survey?: Survey;
    selectedOption?: SurveyOption;
    customResponse?: string;
    status?: PaywallPresentationRequestStatus;
    reason?: PaywallPresentationRequestStatusReason;
    restoreType?: RestoreType;
    userAttributes?: Record<string, any>;
  }) {
    Object.assign(this, options);
  }


  static fromJson(json: any): SuperwallEvent {
    let eventType = EventType[json.event as keyof typeof EventType];

    // Example for one case, replicate logic for other cases as needed
    switch (eventType) {
      case EventType.firstSeen:
      case EventType.appOpen:
      case EventType.appLaunch:
      case EventType.appInstall:
      case EventType.sessionStart:
      case EventType.subscriptionStatusDidChange:
      case EventType.appClose:
      case EventType.touchesBegan:
      case EventType.surveyClose:
      case EventType.reset:
        return new SuperwallEvent({ type: eventType });
      case EventType.deviceAttributes:
        return new SuperwallEvent({
          type: eventType,
          deviceAttributes: json.attributes,
        });
      case EventType.deepLink:
        return new SuperwallEvent({
          type: eventType,
          deepLinkUrl: json.url,
        });
      case EventType.triggerFire:
        return new SuperwallEvent({
          type: eventType,
          eventName: eventType,
          result: TriggerResult.fromJson(json.result),
        });
      case EventType.paywallOpen:
      case EventType.paywallClose:
      case EventType.paywallDecline:
      case EventType.transactionRestore:
      case EventType.paywallWebviewLoadStart:
      case EventType.paywallWebviewLoadFail:
      case EventType.paywallWebviewLoadComplete:
      case EventType.paywallWebviewLoadTimeout:
        return new SuperwallEvent({
          type: eventType,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case EventType.transactionStart:
      case EventType.transactionAbandon:
      case EventType.subscriptionStart:
      case EventType.freeTrialStart:
      case EventType.nonRecurringProductPurchase:
          return new SuperwallEvent({
            type: eventType,
            product: StoreProduct.fromJson(json.product),
            paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
          });
      case EventType.transactionFail:
        return new SuperwallEvent({
          type: eventType,
          error: json.error,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo)
        });
      case EventType.transactionComplete:
        return new SuperwallEvent({
          type: eventType,
          transaction: json.transaction
            ? StoreTransaction.fromJson(json.transaction)
            : undefined,
          product: StoreProduct.fromJson(json.product),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case EventType.transactionRestore:
        return new SuperwallEvent({
          type: eventType,
          restoreType: RestoreType.fromJson(json.restoreType),
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case EventType.userAttributes:
        return new SuperwallEvent({
          type: eventType,
          userAttributes: json.attributes
        });
      case EventType.paywallResponseLoadStart:
      case EventType.paywallResponseLoadNotFound:
      case EventType.paywallResponseLoadFail:
        return new SuperwallEvent({
          type: eventType,
          triggeredEventName: json.triggeredEventName
        });
      case EventType.paywallResponseLoadComplete:
      case EventType.paywallProductsLoadStart:
      case EventType.paywallProductsLoadFail:
      case EventType.paywallProductsLoadComplete:
        return new SuperwallEvent({
          type: eventType,
          triggeredEventName: json.triggeredEventName,
        });
      case EventType.surveyResponse:
        return new SuperwallEvent({
          type: eventType,
          survey: Survey.fromJson(json.survey),
          selectedOption: SurveyOption.fromJson(json.selectedOption),
          customResponse: json.customResponse,
          paywallInfo: PaywallInfo.fromJson(json.paywallInfo),
        });
      case EventType.paywallPresentationRequest:
        return new SuperwallEvent({
          type: eventType,
          status: PaywallPresentationRequestStatus.fromJson(json.status),
          reason: json.reason
            ? PaywallPresentationRequestStatusReason.fromJson(json.reason)
            : undefined,
        });
      // Further cases would follow a similar pattern, handling additional properties as needed
      // For complex nested objects like 'result', 'paywallInfo', etc., you would use the corresponding fromJson methods
      default:
        throw new Error('Invalid event type');
    }
  }
}

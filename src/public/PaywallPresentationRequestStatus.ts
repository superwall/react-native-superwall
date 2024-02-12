import { Experiment } from ''./Experiment';

export enum PaywallPresentationRequestStatusType {
  presentation = 'presentation',
  noPresentation = 'noPresentation',
  timeout = 'timeout',
}

export class PaywallPresentationRequestStatus {
  type: PaywallPresentationRequestStatusType;

  private constructor(type: PaywallPresentationRequestStatusType) {
    this.type = type;
  }

  static fromJson(json: {
    [key: string]: any;
  }): PaywallPresentationRequestStatus {
    switch (json.status) {
      case 'presentation':
        return new PaywallPresentationRequestStatus(PaywallPresentationRequestStatusType.presentation);
      case 'noPresentation':
        return new PaywallPresentationRequestStatus(PaywallPresentationRequestStatusType.noPresentation);
      case 'timeout':
        return new PaywallPresentationRequestStatus(PaywallPresentationRequestStatusType.timeout);
      default:
        throw new Error('Invalid PaywallPresentationRequestStatus type');
    }
  }
}

export enum PaywallPresentationRequestStatusReasonType {
  debuggerPresented = "debuggerPresented",
  paywallAlreadyPresented = "paywallAlreadyPresented",
  userIsSubscribed = "userIsSubscribed",
  holdout = "holdout",
  noRuleMatch = "noRuleMatch",
  eventNotFound = "eventNotFound",
  noPaywallViewController = "noPaywallViewController",
  noPresenter = "noPresenter",
  noConfig = "noConfig",
  subscriptionStatusTimeout = 'subscriptionStatusTimeout',
}

export class PaywallPresentationRequestStatusReason {
  type: PaywallPresentationRequestStatusReasonType;
  experiment?: Experiment;

  private constructor(
    type: PaywallPresentationRequestStatusReasonType,
    experiment?: Experiment
  ) {
    this.type = type;
    this.experiment = experiment;
  }

  static fromJson(json: { [key: string]: any }): PaywallPresentationRequestStatusReason {
    switch (json.reason) {
      // Cases here...
      case 'debuggerPresented':
        return new PaywallPresentationRequestStatusReason(PaywallPresentationRequestStatusReasonType.debuggerPresented);
      case 'paywallAlreadyPresented':
        return new PaywallPresentationRequestStatusReason(PaywallPresentationRequestStatusReasonType.paywallAlreadyPresented);
      case 'userIsSubscribed':
        return new PaywallPresentationRequestStatusReason(PaywallPresentationRequestStatusReasonType.userIsSubscribed);
      case 'holdout':
        return new PaywallPresentationRequestStatusReason(
          PaywallPresentationRequestStatusReasonType.holdout,
          Experiment.fromJson(json.experiment)
        );
      // Continue with other cases...
      default:
        throw new Error('Invalid PaywallPresentationRequestStatusReason type');
    }
  }
}

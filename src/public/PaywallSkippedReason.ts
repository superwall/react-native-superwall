import { Experiment } from './Experiment';

export abstract class PaywallSkippedReason extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }

  static fromJson(json: any): PaywallSkippedReason {
    switch (json.type) {
      case 'Holdout':
        const experiment = Experiment.fromJson(json.experiment);
        return new PaywallSkippedReasonHoldout(experiment);
      case 'NoAudienceMatch':
        return new PaywallSkippedReasonNoAudienceMatch();
      case 'PlacementNotFound':
        return new PaywallSkippedReasonPlacementNotFound();
      case 'UserIsSubscribed':
        return new PaywallSkippedReasonUserIsSubscribed();
      default:
        throw new Error('Unknown PaywallSkippedReason type');
    }
  }
}

// Derived classes
export class PaywallSkippedReasonHoldout extends PaywallSkippedReason {
  experiment: Experiment;

  constructor(experiment: Experiment) {
    super('Holdout');
    this.experiment = experiment;
  }
}

export class PaywallSkippedReasonNoAudienceMatch extends PaywallSkippedReason {
  constructor() {
    super('NoAudienceMatch');
  }
}

export class PaywallSkippedReasonPlacementNotFound extends PaywallSkippedReason {
  constructor() {
    super('PlacementNotFound');
  }
}

export class PaywallSkippedReasonUserIsSubscribed extends PaywallSkippedReason {
  constructor() {
    super('UserIsSubscribed');
  }
}

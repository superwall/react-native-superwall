import { Experiment } from './Experiment';

export abstract class PaywallSkippedReason extends Error {
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
  }
}

// Derived classes
export class Holdout extends PaywallSkippedReason {
  experiment: Experiment;

  constructor(experiment: Experiment) {
    super('Holdout');
    this.experiment = experiment;
  }
}

export class NoRuleMatch extends PaywallSkippedReason {
  constructor() {
    super('NoRuleMatch');
  }
}

export class EventNotFound extends PaywallSkippedReason {
  constructor() {
    super('EventNotFound');
  }
}

export class UserIsSubscribed extends PaywallSkippedReason {
  constructor() {
    super('UserIsSubscribed');
  }
}

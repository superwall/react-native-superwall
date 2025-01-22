import { Experiment } from './Experiment';

export enum TriggerResultType {
  eventNotFound,
  noAudienceMatch,
  paywall,
  holdout,
  error,
}

// TypeScript class for TriggerResult
export class TriggerResult {
  type: TriggerResultType;
  experiment?: Experiment;
  error?: string;

  private constructor(
    type: TriggerResultType,
    experiment?: Experiment,
    error?: string
  ) {
    this.type = type;
    this.experiment = experiment;
    this.error = error;
  }

  static eventNotFound(): TriggerResult {
    return new TriggerResult(TriggerResultType.eventNotFound);
  }

  static noAudienceMatch(): TriggerResult {
    return new TriggerResult(TriggerResultType.noAudienceMatch);
  }

  static paywall(experiment: Experiment): TriggerResult {
    return new TriggerResult(TriggerResultType.paywall, experiment);
  }

  static holdout(experiment: Experiment): TriggerResult {
    return new TriggerResult(TriggerResultType.holdout, experiment);
  }

  static error(error: string): TriggerResult {
    return new TriggerResult(TriggerResultType.error, undefined, error);
  }

  static fromJson(json: any): TriggerResult {
    switch (json.result) {
      case 'eventNotFound':
        return TriggerResult.eventNotFound();
      case 'noAudienceMatch':
        return TriggerResult.noAudienceMatch();
      case 'paywall':
        return TriggerResult.paywall(Experiment.fromJson(json.experiment));
      case 'holdout':
        return TriggerResult.holdout(Experiment.fromJson(json.experiment));
      case 'error':
        return TriggerResult.error(json.error);
      default:
        throw new Error('Invalid TriggerResult type');
    }
  }
}

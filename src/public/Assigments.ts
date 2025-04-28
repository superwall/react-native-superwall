import { Variant } from './Experiment';

export class Assignment {
  experimentId: String;
  variant: Variant;
  isSentToServer: Boolean;

  constructor(experimentId: String, variant: Variant, isSentToServer: Boolean) {
    this.experimentId = experimentId;
    this.variant = variant;
    this.isSentToServer = isSentToServer;
  }

  static fromJson(json: any): Assignment {
    return new Assignment(
      json.experimentId,
      Variant.fromJson(json.variant),
      json.isSentToServer ?? false
    );
  }
}

export type ConfirmedAssignment = Assignment;

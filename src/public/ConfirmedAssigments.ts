import { Variant } from './Experiment';

export class ConfirmedAssignment {
  experimentId: String;
  variant: Variant;

  constructor(experimentId: String, variant: Variant) {
    this.experimentId = experimentId;
    this.variant = variant;
  }

  static fromJson(json: any): ConfirmedAssignment {
    return new ConfirmedAssignment(
      json.experimentId,
      Variant.fromJson(json.variant)
    );
  }
}

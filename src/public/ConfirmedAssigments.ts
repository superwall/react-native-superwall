import { VariantType } from './Experiment';

export class ConfirmedAssignment {
  experimentId: String;
  variant: VariantType;

  constructor(experimentId: String, variant: VariantType) {
    this.experimentId = experimentId;
    this.variant = variant;
  }

  static fromJson(json: any): ConfirmedAssignment {
    return new ConfirmedAssignment(
      json.experimentId,
      VariantType[json.variant as keyof typeof VariantType]
    );
  }
}

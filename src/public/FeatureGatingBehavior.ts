export enum FeatureGatingBehavior {
  gated = "gated",
  nonGated = "nonGated",
}

export namespace FeatureGatingBehavior {
  export function toJson(behavior: FeatureGatingBehavior): string {
    return behavior;
  }

  export function fromJson(json: string): FeatureGatingBehavior {
    if (
      !Object.values(FeatureGatingBehavior).includes(
        json as FeatureGatingBehavior
      )
    ) {
      throw new Error(`Invalid FeatureGatingBehavior value: ${json}`);
    }
    return json as FeatureGatingBehavior;
  }
}

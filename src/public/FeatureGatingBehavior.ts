export enum FeatureGatingBehavior {
  gated = "GATED",
  nonGated = "NON_GATED",
}

// Standalone functions for conversion
export function featureGatingBehaviorToJson(
  behavior: FeatureGatingBehavior
): string {
  return behavior;
}

export function featureGatingBehaviorFromJson(
  json: string
): FeatureGatingBehavior {
  const behavior = Object.values(FeatureGatingBehavior).find(b => b === json);
  if (!behavior) {
    throw new Error(`Invalid FeatureGatingBehavior value: ${json}`);
  }
  return behavior;
}

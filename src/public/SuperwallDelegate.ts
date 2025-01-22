import { PaywallInfo } from './PaywallInfo';
import { EntitlementStatus } from './EntitlementStatus';
import { SuperwallPlacementInfo } from './SuperwallPlacementInfo';

export abstract class SuperwallDelegate {
  abstract entitlementStatusDidChange(
    from: EntitlementStatus,
    to: EntitlementStatus
  ): void;
  abstract handleSuperwallPlacement(
    placementInfo: SuperwallPlacementInfo
  ): void;
  abstract handleCustomPaywallAction(name: string): void;
  abstract willDismissPaywall(paywallInfo: PaywallInfo): void;
  abstract willPresentPaywall(paywallInfo: PaywallInfo): void;
  abstract didDismissPaywall(paywallInfo: PaywallInfo): void;
  abstract didPresentPaywall(paywallInfo: PaywallInfo): void;
  abstract paywallWillOpenURL(url: URL): void;
  abstract paywallWillOpenDeepLink(url: URL): void;
  abstract handleLog(
    level: string,
    scope: string,
    message?: string,
    info?: Map<string, any>,
    error?: string
  ): void;
}

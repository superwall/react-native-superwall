import { PaywallInfo } from './PaywallInfo';
import type { RedemptionResult } from './RedemptionResults';
import { SubscriptionStatus } from './SubscriptionStatus';
import { SuperwallEventInfo } from './SuperwallEventInfo';

export abstract class SuperwallDelegate {
  abstract subscriptionStatusDidChange(
    from: SubscriptionStatus,
    to: SubscriptionStatus
  ): void;
  abstract willRedeemLink(): void;
  abstract didRedeemLink(result: RedemptionResult): void;
  abstract handleSuperwallEvent(eventInfo: SuperwallEventInfo): void;
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

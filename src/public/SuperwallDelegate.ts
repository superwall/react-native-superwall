/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck TS6133: Unused variable
import { PaywallInfo } from './PaywallInfo';
import type { RedemptionResult } from './RedemptionResults';
import { SubscriptionStatus } from './SubscriptionStatus';
import { SuperwallEventInfo } from './SuperwallEventInfo';

export class SuperwallDelegate {
  subscriptionStatusDidChange(
    from: SubscriptionStatus,
    to: SubscriptionStatus
  ): void {}
  willRedeemLink(): void {}
  didRedeemLink(result: RedemptionResult): void {}
  handleSuperwallEvent(eventInfo: SuperwallEventInfo): void {}
  handleCustomPaywallAction(name: string): void {}
  willDismissPaywall(paywallInfo: PaywallInfo): void {}
  willPresentPaywall(paywallInfo: PaywallInfo): void {}
  didDismissPaywall(paywallInfo: PaywallInfo): void {}
  didPresentPaywall(paywallInfo: PaywallInfo): void {}
  paywallWillOpenURL(url: URL): void {}
  paywallWillOpenDeepLink(url: URL): void {}
  handleLog(
    level: string,
    scope: string,
    message?: string,
    info?: Map<string, any>,
    error?: string
  ): void {}
}

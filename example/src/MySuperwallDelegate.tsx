import {
  PaywallInfo,
  SubscriptionStatus,
  SuperwallDelegate,
  SuperwallEventInfo,
} from '@superwall-sdk/react-native-superwall';

export class MySuperwallDelegate extends SuperwallDelegate {
  subscriptionStatusDidChange(newValue: SubscriptionStatus): void {
    console.log('Subscription status changed to', newValue);
  }

  handleSuperwallEvent(eventInfo: SuperwallEventInfo): void {
    console.log('Handling Superwall event:', eventInfo);
  }

  handleCustomPaywallAction(name: string): void {
    console.log('Handling custom paywall action:', name);
  }

  willDismissPaywall(paywallInfo: PaywallInfo): void {
    console.log('Paywall will dismiss:', paywallInfo);
  }

  willPresentPaywall(paywallInfo: PaywallInfo): void {
    console.log('Paywall will present:', paywallInfo);
  }

  didDismissPaywall(paywallInfo: PaywallInfo): void {
    console.log('Paywall did dismiss:', paywallInfo);
  }

  didPresentPaywall(paywallInfo: PaywallInfo): void {
    console.log('Paywall did present:', paywallInfo);
  }

  paywallWillOpenURL(url: URL): void {
    console.log('Paywall will open URL:', url);
  }

  paywallWillOpenDeepLink(url: URL): void {
    console.log('Paywall will open Deep Link:', url);
  }

  handleLog(
    level: string,
    scope: string,
    message?: string,
    info?: Map<string, any>,
    error?: string
  ): void {
    console.log(`[${level}] ${scope}: ${message}`, info, error);
  }
}

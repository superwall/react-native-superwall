import {
  PaywallInfo,
  SubscriptionStatus,
  SuperwallDelegate,
  SuperwallPlacementInfo,
  PlacementType,
} from '../../src';

export class MySuperwallDelegate extends SuperwallDelegate {
  subscriptionStatusDidChange(
    from: SubscriptionStatus,
    to: SubscriptionStatus
  ): void {
    console.log('Entitlement status changed from', from, 'to', to);
  }

  handleSuperwallPlacement(placementInfo: SuperwallPlacementInfo) {
    console.log('Handling Superwall placement:', placementInfo);

    switch (placementInfo.placement.type) {
      case PlacementType.appOpen:
        console.log('appOpen placement');
        break;
      case PlacementType.deviceAttributes:
        console.log(
          `deviceAttributes placement: ${placementInfo.placement.deviceAttributes}`
        );
        break;
      case PlacementType.paywallOpen:
        const paywallInfo = placementInfo.placement.paywallInfo;
        console.log(`paywallOpen placement: ${paywallInfo}`);

        if (paywallInfo && paywallInfo !== null) {
          console.log(`paywallInfo.identifier: ${paywallInfo.identifier}`);
          console.log(`paywallInfo.productIds: ${paywallInfo.productIds}`);
        }
        break;
      default:
        break;
    }
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

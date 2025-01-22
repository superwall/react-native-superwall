import {
  PaywallInfo,
  EntitlementStatus,
  SuperwallDelegate,
  SuperwallPlacementInfo,
  PlacementType,
} from '@superwall/react-native-superwall';

export class MySuperwallDelegate extends SuperwallDelegate {
  entitlementStatusDidChange(
    from: EntitlementStatus,
    to: EntitlementStatus
  ): void {
    console.log('Entitlement status changed from', from, 'to', to);
  }

  handleSuperwallPlacement(placementInfo: SuperwallPlacementInfo) {
    console.log('Handling Superwall placement:', placementInfo);

    switch (placementInfo.placement) {
      case PlacementType.appOpen:
        console.log("appOpen placement");
        break; // Don't forget to add break statements to prevent fall-through
      case PlacementType.deviceAttributes:
        console.log(
          `deviceAttributes placement: ${placementInfo.placement.deviceAttributes}`
        );
        break;
      case PlacementType.paywallOpen:
        const paywallInfo = placementInfo.placement.paywallInfo;
        console.log(`paywallOpen placement: ${paywallInfo}`);

        if (paywallInfo !== null) {
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

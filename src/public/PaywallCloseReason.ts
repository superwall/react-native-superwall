export enum PaywallCloseReason {
  SystemLogic = "SystemLogic",
  ForNextPaywall = "ForNextPaywall",
  WebViewFailedToLoad = "WebViewFailedToLoad",
  ManualClose = "ManualClose",
  None = "None",
}

export namespace PaywallCloseReason {
  export function toJson(reason: PaywallCloseReason): string {
    return reason;
  }

  export function fromJson(json: string): PaywallCloseReason {
    switch (json) {
      case "SystemLogic":
        return PaywallCloseReason.SystemLogic;
      case "ForNextPaywall":
        return PaywallCloseReason.ForNextPaywall;
      case "WebViewFailedToLoad":
        return PaywallCloseReason.WebViewFailedToLoad;
      case "ManualClose":
        return PaywallCloseReason.ManualClose;
      case "None":
        return PaywallCloseReason.None;
      default:
        throw new Error(`Invalid PaywallCloseReason value: ${json}`);
    }
  }
}

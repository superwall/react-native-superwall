export enum PaywallCloseReason {
  SystemLogic = "systemLogic",
  ForNextPaywall = "forNextPaywall",
  WebViewFailedToLoad = "webViewFailedToLoad",
  ManualClose = "manualClose",
  None = "none",
}

export namespace PaywallCloseReason {
  export function toJson(reason: PaywallCloseReason): string {
    return reason;
  }

  export function fromJson(json: string): PaywallCloseReason {
    switch (json) {
      case "systemLogic":
        return PaywallCloseReason.SystemLogic;
      case "forNextPaywall":
        return PaywallCloseReason.ForNextPaywall;
      case "webViewFailedToLoad":
        return PaywallCloseReason.WebViewFailedToLoad;
      case "manualClose":
        return PaywallCloseReason.ManualClose;
      case "none":
        return PaywallCloseReason.None;
      default:
        throw new Error(`Invalid PaywallCloseReason value: ${json}`);
    }
  }
}

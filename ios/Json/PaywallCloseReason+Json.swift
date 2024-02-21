import SuperwallKit

extension PaywallCloseReason {
  func toJson() -> String {
    switch self {
      case .systemLogic:
        return "systemLogic"
      case .forNextPaywall:
        return "forNextPaywall"
      case .webViewFailedToLoad:
        return "webViewFailedToLoad"
      case .manualClose:
        return "manualClose"
      case .none:
        return "none"
    }
  }
}

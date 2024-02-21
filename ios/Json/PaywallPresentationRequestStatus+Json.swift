import SuperwallKit

extension PaywallPresentationRequestStatus {
  func toJson() -> [String: String] {
    switch self {
      case .presentation:
        return ["status": "presentation"]
      case .noPresentation:
        return ["status": "noPresentation"]
      case .timeout:
        return ["status": "timeout"]
    }
  }
}

extension PaywallPresentationRequestStatusReason {
  func toJson() -> [String: Any?] {
    switch self {
      case .debuggerPresented:
        return ["reason": "debuggerPresented"]
      case .paywallAlreadyPresented:
        return ["reason": "paywallAlreadyPresented"]
      case .userIsSubscribed:
        return ["reason": "userIsSubscribed"]
      case .holdout(let experiment):
      return ["reason": "holdout", "experiment": experiment.toJson()]
      case .noRuleMatch:
        return ["reason": "noRuleMatch"]
      case .eventNotFound:
        return ["reason": "eventNotFound"]
      case .noPaywallViewController:
        return ["reason": "noPaywallViewController"]
      case .noPresenter:
        return ["reason": "noPresenter"]
      case .noConfig:
        return ["reason": "noConfig"]
      case .subscriptionStatusTimeout:
        return ["reason": "subscriptionStatusTimeout"]
    }
  }
}


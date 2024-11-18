import Foundation
import SuperwallKit

extension PresentationResult {
  func toJson() -> [String: Any] {
    switch self {
    case .holdout(let experiment):
      return [
        "type": "Holdout",
        "experiment": experiment.toJson(),
      ]
    case .paywall(let experiment):
      return [
        "type": "Paywall",
        "experiment": experiment.toJson(),
      ]
    case .noRuleMatch:
      return ["type": "NoRuleMatch"]
    case .eventNotFound:
      return ["type": "EventNotFound"]
    case .userIsSubscribed:
      return ["type": "UserIsSubscribed"]
    case .paywallNotAvailable:
      return ["type": "PaywallNotAvailable"]
    }
  }
}

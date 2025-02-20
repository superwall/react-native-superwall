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
    case .noAudienceMatch:
      return ["type": "NoAudienceMatch"]
    case .placementNotFound:
      return ["type": "PlacementNotFound"]
    case .paywallNotAvailable:
      return ["type": "PaywallNotAvailable"]
    }
  }
}

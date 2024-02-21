import SuperwallKit

extension TriggerResult {
  func toJson() -> [String: Any] {
    switch self {
      case .eventNotFound:
        return ["result": "eventNotFound"]
      case .noRuleMatch:
        return ["result": "noRuleMatch"]
      case .paywall(let experiment):
        return ["result": "paywall", "experiment": experiment.toJson()]
      case .holdout(let experiment):
        return ["result": "holdout", "experiment": experiment.toJson()]
      case .error(let error):
        return ["result": "error", "error": error.localizedDescription]
    }
  }
}

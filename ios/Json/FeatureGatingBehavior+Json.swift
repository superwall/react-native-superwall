import SuperwallKit

extension FeatureGatingBehavior {
  func toJson() -> String {
    switch self {
      case .gated:
        return "gated"
      case .nonGated:
        return "nonGated"
    }
  }

  static func fromJson(_ json: String) -> FeatureGatingBehavior? {
    switch json {
      case "gated":
        return .gated
      case "nonGated":
        return .nonGated
      default:
        return nil
    }
  }
}

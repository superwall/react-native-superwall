import SuperwallKit

extension Experiment {
  func toJson() -> [String: Any] {
    return [
      "id": id,
      "groupId": groupId,
      "variant": variant.toJson()
    ]
  }
}

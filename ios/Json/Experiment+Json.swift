import SuperwallKit

extension Experiment {
  func toJson() -> [String: Any] {
    var variant: [String: Any] = [
      "id": variant.id,
      "type": variant.type.rawValue,
      "paywallId": variant.paywallId
    ]

    return [
      "id": id,
      "groupId": groupId,
      "variant": variant
    ]
  }
}

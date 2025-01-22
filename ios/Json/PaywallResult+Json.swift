import SuperwallKit

extension PaywallResult {
  func toJson() -> [String: Any] {
    switch self {
    case .purchased(let product):
      return [
        "type": "purchased",
        "product": product.toJson(),
      ]
    case .declined:
      return [
        "type": "declined"
      ]
    case .restored:
      return [
        "type": "restored"
      ]
    }
  }
}

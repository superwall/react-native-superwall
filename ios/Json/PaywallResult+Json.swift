import SuperwallKit

extension PaywallResult {
  func toJson() -> [String: Any] {
    switch self {
    case .purchased(let product):
      return [
        "type": "purchased",
        "productId": product.productIdentifier,
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

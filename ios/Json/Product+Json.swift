import SuperwallKit

extension Product {
  func toJson() -> [String: Any] {
    return [
      "type": self.type.toJson(),
      "id": self.id
    ]
  }
}

extension ProductType {
  func toJson() -> String {
    switch self {
      case .primary:
        return "primary"
      case .secondary:
        return "secondary"
      case .tertiary:
        return "tertiary"
    }
  }
}

import SuperwallKit

extension ComputedPropertyRequest {
  func toJson() -> [String: Any] {
    return [
      "type": self.type.description,
      "placementName": self.placementName
    ]
  }
}

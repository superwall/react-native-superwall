import SuperwallKit

extension AppStoreProduct {
  func toJson() -> [String: Any] {
    return [
      "id": id
    ]
  }
}

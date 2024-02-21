import SuperwallKit

extension RestoreType {
  func toJson() -> [String: Any?] {
    switch self {
      case .viaPurchase(let storeTransaction):
        return [
          "type": "viaPurchase",
          "storeTransaction": storeTransaction?.toJson()
        ]
      case .viaRestore:
        return ["type": "viaRestore"]
    }
  }
}

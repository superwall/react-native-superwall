import SuperwallKit

struct PurchaseResultError: Error {
  let message: String
}

extension PurchaseResult {
  static func fromJson(_ dictionary: [String: Any]) -> PurchaseResult? {
    guard let type = dictionary["type"] as? String else {
      return nil
    }
    switch type {
    case "cancelled":
      return  PurchaseResult.cancelled
    case "purchased":
      return PurchaseResult.purchased
    case "restored":
      return PurchaseResult.restored
    case "pending":
      return PurchaseResult.pending
    case "failed":
      guard let message = dictionary["error"] as? String else {
        return nil
      }
      return PurchaseResult.failed(PurchaseResultError(message: message))
    default:
      return nil
    }
  }
}

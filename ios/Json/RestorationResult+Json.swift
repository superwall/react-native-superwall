import SuperwallKit

struct RestorationResultError: Error {
  let message: String
}

extension RestorationResult {
  static func fromJson(_ dictionary: [String: Any]) -> RestorationResult? {
    guard let type = dictionary["type"] as? String else {
      return nil
    }
    switch type {
    case "restored":
      return RestorationResult.restored
    case "failed":
      guard let message = dictionary["error"] as? String else {
        return nil
      }
      return RestorationResult.failed(RestorationResultError(message: message))
    default:
      return nil
    }
  }
}

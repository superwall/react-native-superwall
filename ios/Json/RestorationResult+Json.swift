import SuperwallKit

struct RestorationResultError: Error {
  let message: String
}

extension RestorationResult {
  static func fromJson(_ dictionary: [String: Any]) -> RestorationResult? {
    guard let result = dictionary["result"] as? String else {
      return nil
    }
    switch result {
    case "restored":
      return RestorationResult.restored
    case "failed":
      guard let message = dictionary["errorMessage"] as? String else {
        return nil
      }
      return RestorationResult.failed(RestorationResultError(message: message))
    default:
      return nil
    }
  }
}

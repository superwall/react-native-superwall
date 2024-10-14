import Foundation
import SuperwallKit

extension ConfirmedAssignment {
  func toJson() -> [String: Any] {
    return [
      "experimentId": experimentId,
      "variant": variant.toJson(),
    ]
  }
}

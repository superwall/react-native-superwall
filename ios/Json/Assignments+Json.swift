import Foundation
import SuperwallKit

extension Assignment {
  func toJson() -> [String: Any] {
    return [
      "experimentId": experimentId,
      "variant": variant.toJson(),
      "isSentToServer": isSentToServer,
    ]
  }
}

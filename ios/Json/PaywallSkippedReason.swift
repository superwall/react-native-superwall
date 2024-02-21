//
//  PaywallSkippedReason.swift
//  Superwall
//
//  Created by Yusuf Tör on 21/02/2024.
//

import SuperwallKit

extension PaywallSkippedReason {
  func toJson() -> [String: Any] {
    switch self {
    case .holdout(let experiment):
      return [
        "type": "Holdout",
        "experiment": experiment.toJson()
      ]
    case .noRuleMatch:
      return ["type": "NoRuleMatch"]
    case .eventNotFound:
      return ["type": "EventNotFound"]
    case .userIsSubscribed:
      return ["type": "UserIsSubscribed"]
    }
  }
}

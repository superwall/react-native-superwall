//
//  SubscriptionStatus+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 21/02/2024.
//

import SuperwallKit

extension SubscriptionStatus {
  static func fromString(subscriptionStatus: String) -> SubscriptionStatus {
    switch subscriptionStatus {
    case "ACTIVE":
      return .active
    case "INACTIVE":
      return .inactive
    case "UNKNOWN":
      return .unknown
    default:
      return .unknown
    }
  }

  func toString() -> String {
    switch self {
    case .active:
      return "ACTIVE"
    case .inactive:
      return "INACTIVE"
    case .unknown:
      return "UNKNOWN"
    default:
      return "UNKNOWN"
    }
  }
}

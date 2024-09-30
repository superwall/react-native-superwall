//
//  ConfigurationStatus+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 21/02/2024.
//

import SuperwallKit

extension ConfigurationStatus {
  static func fromString(configurationStatus: String) -> ConfigurationStatus {
    switch configurationStatus {
    case "PENDING":
      return .pending
    case "CONFIGURED":
      return .configured
    case "FAILED":
      return .failed
    default:
      return .pending
    }
  }

  func toString() -> String {
    switch self {
    case .configured:
      return "CONFIGURED"
    case .failed:
      return "FAILED"
    case .pending:
      return "PENDING"
    default:
      return "PENDING"
    }
  }
}

//
//  EntitlementType+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 20/01/2025.
//

import SuperwallKit

extension EntitlementType {
  func toJson() -> String {
    switch self {
    case .serviceLevel:
      return "SERVICE_LEVEL"
    }
  }
}

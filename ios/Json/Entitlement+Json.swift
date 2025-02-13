//
//  Entitlement+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 20/01/2025.
//

import SuperwallKit

extension Entitlement {
  func toJson() -> [String: Any] {
    return [
      "id": id,
      "type": type.toJson(),
    ]
  }
}

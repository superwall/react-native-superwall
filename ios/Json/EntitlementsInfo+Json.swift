//
//  Entitlements+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 20/01/2025.
//

import SuperwallKit

extension EntitlementsInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["all"] = all.map { $0.toJson() }
    map["inactive"] = inactive.map { $0.toJson() }
    map["active"] = active.map { $0.toJson() }

    return map
  }
}

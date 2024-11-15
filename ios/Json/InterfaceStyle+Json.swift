//
//  InterfaceStyle+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 21/02/2024.
//

import SuperwallKit

extension InterfaceStyle {
  static func fromString(style: String) -> InterfaceStyle {
    switch style {
    case "LIGHT":
      return .light
    case "DARK":
      return .dark
    default:
      return .light
    }
  }
}

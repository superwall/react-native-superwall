package com.superwallreactnative.models

import com.superwall.sdk.network.device.InterfaceStyle

class InterfaceStyle {
  companion object {
    fun fromString(interfaceStyle: String): InterfaceStyle {
      return when (interfaceStyle) {
        "LIGHT" -> InterfaceStyle.LIGHT
        "DARK" -> InterfaceStyle.DARK
        else -> InterfaceStyle.LIGHT // Default case to handle unexpected values
      }
    }
  }
}

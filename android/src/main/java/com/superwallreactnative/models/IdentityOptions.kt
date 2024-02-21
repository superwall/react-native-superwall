package com.superwallreactnative.models

import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.identity.IdentityOptions

class IdentityOptions {
  companion object {
    fun fromJson(json: ReadableMap): IdentityOptions {
      val restorePaywallAssignments = json.getBoolean("restorePaywallAssignments")
      return IdentityOptions(restorePaywallAssignments = restorePaywallAssignments)
    }
  }
}

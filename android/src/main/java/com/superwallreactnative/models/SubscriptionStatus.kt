package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.entitlements.SubscriptionStatus


fun SubscriptionStatus.toJson(): ReadableMap {
  val status = this
  val map = Arguments.createMap()
  map.putString("status", when (status) {
    is SubscriptionStatus.Active -> "ACTIVE"
    is SubscriptionStatus.Inactive -> "INACTIVE"
    is SubscriptionStatus.Unknown -> "UNKNOWN"
  })
  map.putArray("entitlements", Arguments.createArray().apply {
    when (status) {
      is SubscriptionStatus.Active -> {
        status.entitlements.forEach { entitlement ->
          val entitlementMap = Arguments.createMap()
          entitlementMap.putString("id", entitlement.id)
          pushMap(entitlementMap)
        }
      }
      is SubscriptionStatus.Inactive -> {}
      is SubscriptionStatus.Unknown -> {}
    }
  })
  return map
}
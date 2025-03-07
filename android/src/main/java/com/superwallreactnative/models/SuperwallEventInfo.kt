package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.analytics.superwall.SuperwallPlacementInfo

fun SuperwallPlacementInfo.toJson(): ReadableMap {
  val map = Arguments.createMap()
  map.putMap("event", SuperwallPlacement.toJson(this.placement))
  map.putMap("params", convertMapToReadableMap(this.params))
  return map
}

package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.analytics.superwall.SuperwallEventInfo

fun SuperwallEventInfo.toJson(): ReadableMap {
  val map = Arguments.createMap()
  map.putMap("event", SuperwallEvent.toJson(this.event))
  map.putMap("params", convertMapToReadableMap(this.params))
  return map
}

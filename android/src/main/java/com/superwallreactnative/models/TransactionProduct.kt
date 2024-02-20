package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.analytics.superwall.TransactionProduct

fun TransactionProduct.toJson(): ReadableMap {
  val map = Arguments.createMap()
  map.putString("id", id)
  return map
}

package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.store.transactions.RestoreType

fun RestoreType.toJson(): ReadableMap {
  val map = Arguments.createMap()
  when (this) {
    is RestoreType.ViaPurchase -> {
      map.putString("type", "viaPurchase")
      map.putMap("type", transaction?.toJson())
    }
    is RestoreType.ViaRestore -> map.putString("type", "viaRestore")
  }
  return map
}

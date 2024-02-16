package com.superwallreactnative.models

import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.delegate.RestorationResult

class RestorationResult {
  companion object {
    fun fromJson(json: ReadableMap): RestorationResult {
      return when (json.getString("result")) {
        "restored" -> RestorationResult.Restored()
        "failed" -> {
          val errorMessage = json.getString("errorMessage") ?: "Unknown error"
          RestorationResult.Failed(Error(errorMessage))
        }
        else -> RestorationResult.Failed(Error("Unknown restoration result"))
      }
    }
  }
}

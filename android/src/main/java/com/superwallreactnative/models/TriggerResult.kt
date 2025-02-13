package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.triggers.TriggerResult

class TriggerResult {
  companion object {
    fun toJson(triggerResult: TriggerResult): ReadableMap {
      val map = Arguments.createMap()
      when (triggerResult) {
        is TriggerResult.PlacementNotFound -> {
          map.putString("result", "placementNotFound")
        }
        is TriggerResult.NoAudienceMatch -> {
          map.putString("result", "noAudienceMatch")
        }
        is TriggerResult.Paywall -> {
          map.putString("result", "paywall")
          map.putMap("experiment", Experiment.toJson(triggerResult.experiment))
        }
        is TriggerResult.Holdout -> {
          map.putString("result", "holdout")
          map.putMap("experiment", Experiment.toJson(triggerResult.experiment))
        }
        is TriggerResult.Error -> {
          map.putString("result", "error")
          map.putString("errorMessage", triggerResult.error.localizedMessage)
        }
      }
      return map
    }
  }
}

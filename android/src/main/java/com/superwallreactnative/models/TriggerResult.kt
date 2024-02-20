package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.triggers.TriggerResult

class TriggerResult {
  companion object {
    fun toJson(triggerResult: TriggerResult): ReadableMap {
      val map = Arguments.createMap()
      when (triggerResult) {
        is TriggerResult.EventNotFound -> {
          map.putString("result", "eventNotFound")
        }
        is TriggerResult.NoRuleMatch -> {
          map.putString("result", "noRuleMatch")
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

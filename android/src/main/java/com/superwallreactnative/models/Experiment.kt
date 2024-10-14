package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.triggers.Experiment
import com.superwall.sdk.paywall.presentation.internal.state.PaywallSkippedReason

class Experiment {
  companion object {
    fun toJson(experiment: Experiment): ReadableMap {
      val variantMap = experiment.variant.toJson()

      val experimentMap = Arguments.createMap()
      experimentMap.putString("id", experiment.id)
      experimentMap.putString("groupId", experiment.groupId)
      experimentMap.putMap("variant", variantMap)

      return experimentMap
    }
  }
}

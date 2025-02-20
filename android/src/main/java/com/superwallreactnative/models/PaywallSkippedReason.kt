package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.paywall.presentation.internal.state.PaywallSkippedReason

class PaywallSkippedReason {
  companion object {
    fun toJson(skippedReason: PaywallSkippedReason): ReadableMap {
      val map = Arguments.createMap()

      when (skippedReason) {
        is PaywallSkippedReason.Holdout -> {
          map.putString("type", "Holdout")
          map.putMap("experiment", Experiment.toJson(skippedReason.experiment))
        }

        is PaywallSkippedReason.NoAudienceMatch -> {
          map.putString("type", "NoAudienceMatch")
        }

        is PaywallSkippedReason.PlacementNotFound -> {
          map.putString("type", "PlacementNotFound")
        }

        is PaywallSkippedReason.UserIsSubscribed -> {
          map.putString("type", "UserIsSubscribed")
        }
      }

      return map
    }
  }
}

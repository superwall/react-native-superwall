package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap

import com.superwall.sdk.paywall.presentation.result.PresentationResult

fun PresentationResult.toJson(): ReadableMap {
  val map = Arguments.createMap()

  when (this) {
    is PresentationResult.Holdout -> {
      map.putString("type", "Holdout")
      map.putMap("experiment", Experiment.toJson(experiment))
    }

    is PresentationResult.Paywall -> {
      map.putString("type", "Paywall")
      map.putMap("experiment", Experiment.toJson(experiment))
    }

    is PresentationResult.NoAudienceMatch -> {
      map.putString("type", "NoAudienceMatch")
    }

    is PresentationResult.PlacementNotFound -> {
      map.putString("type", "PlacementNotFound")
    }

    is PresentationResult.PaywallNotAvailable -> {
      map.putString("type", "PaywallNotAvailable")
    }
  }

  return map
}

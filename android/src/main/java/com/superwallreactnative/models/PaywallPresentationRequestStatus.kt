package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.paywall.presentation.internal.PaywallPresentationRequestStatus
import com.superwall.sdk.paywall.presentation.internal.PaywallPresentationRequestStatusReason

fun PaywallPresentationRequestStatus.toJson(): ReadableMap {
  val map = Arguments.createMap()
  val statusValue = when (this) {
    PaywallPresentationRequestStatus.Presentation -> "presentation"
    PaywallPresentationRequestStatus.NoPresentation -> "noPresentation"
    PaywallPresentationRequestStatus.Timeout -> "timeout"
  }
  map.putString("status", statusValue)
  return map
}

fun PaywallPresentationRequestStatusReason.toJson(): ReadableMap {
  val map = Arguments.createMap()
  when (this) {
    is PaywallPresentationRequestStatusReason.DebuggerPresented -> map.putString("reason", "debuggerPresented")
    is PaywallPresentationRequestStatusReason.PaywallAlreadyPresented -> map.putString("reason", "paywallAlreadyPresented")
    is PaywallPresentationRequestStatusReason.UserIsSubscribed -> map.putString("reason", "userIsSubscribed")
    is PaywallPresentationRequestStatusReason.Holdout -> {
      map.putString("reason", "holdout")
      map.putMap("experiment", Experiment.toJson(this.experiment))
    }
    is PaywallPresentationRequestStatusReason.NoRuleMatch -> map.putString("reason", "noRuleMatch")
    is PaywallPresentationRequestStatusReason.EventNotFound -> map.putString("reason", "eventNotFound")
    is PaywallPresentationRequestStatusReason.NoPaywallViewController -> map.putString("reason", "noPaywallViewController")
    is PaywallPresentationRequestStatusReason.NoPresenter -> map.putString("reason", "noPresenter")
    is PaywallPresentationRequestStatusReason.NoConfig -> map.putString("reason", "noConfig")
    is PaywallPresentationRequestStatusReason.SubscriptionStatusTimeout -> map.putString("reason", "subscriptionStatusTimeout")
  }
  return map
}

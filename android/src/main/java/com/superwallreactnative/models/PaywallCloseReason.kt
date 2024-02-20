package com.superwallreactnative.models

import com.superwall.sdk.paywall.presentation.PaywallCloseReason

fun PaywallCloseReason.rawValue(): String = when (this) {
  is PaywallCloseReason.SystemLogic -> "SystemLogic"
  is PaywallCloseReason.ForNextPaywall -> "ForNextPaywall"
  is PaywallCloseReason.WebViewFailedToLoad -> "WebViewFailedToLoad"
  is PaywallCloseReason.ManualClose -> "ManualClose"
  is PaywallCloseReason.None -> "None"
}

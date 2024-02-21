package com.superwallreactnative.models

import com.superwall.sdk.paywall.presentation.PaywallCloseReason

fun PaywallCloseReason.rawValue(): String = when (this) {
  is PaywallCloseReason.SystemLogic -> "systemLogic"
  is PaywallCloseReason.ForNextPaywall -> "forNextPaywall"
  is PaywallCloseReason.WebViewFailedToLoad -> "webViewFailedToLoad"
  is PaywallCloseReason.ManualClose -> "manualClose"
  is PaywallCloseReason.None -> "none"
}

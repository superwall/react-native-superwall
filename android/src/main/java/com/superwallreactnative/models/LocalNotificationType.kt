package com.superwallreactnative.models

import com.superwall.sdk.models.paywall.LocalNotificationType

fun LocalNotificationType.toJson(): String {
  return when (this) {
    LocalNotificationType.TrialStarted -> "trialStarted"
    else -> ""
  }
}

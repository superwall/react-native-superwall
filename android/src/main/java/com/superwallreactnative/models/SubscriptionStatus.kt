package com.superwallreactnative.models

import com.superwall.sdk.delegate.SubscriptionStatus

class SubscriptionStatus {
  companion object {
    fun fromString(subscriptionStatus: String): SubscriptionStatus {
      return when (subscriptionStatus) {
        "ACTIVE" -> SubscriptionStatus.ACTIVE
        "INACTIVE" -> SubscriptionStatus.INACTIVE
        "UNKNOWN" -> SubscriptionStatus.UNKNOWN
        else -> SubscriptionStatus.UNKNOWN // Default case to handle unexpected values
      }
    }
  }
}

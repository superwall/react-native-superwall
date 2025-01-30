package com.superwallreactnative.models

import com.superwall.sdk.delegate.SubscriptionStatus

class SubscriptionStatus {
  companion object {
    fun fromString(subscriptionStatus: String): SubscriptionStatus {
      return when (subscriptionStatus) {
        "ACTIVE" -> SubscriptionStatus.Active
        "INACTIVE" -> SubscriptionStatus.Inactive
        "UNKNOWN" -> SubscriptionStatus.Unknown
        else -> SubscriptionStatus.Unknown // Default case to handle unexpected values
      }
    }
  }
}

package com.superwallreactnative.models

import com.superwall.sdk.models.entitlements.SubscriptionStatus

class SubscriptionStatus {
  companion object {
    fun fromString(subscriptionStatus: String): SubscriptionStatus {
      return when (subscriptionStatus) {
        "ACTIVE" -> SubscriptionStatus.Active(emptySet())
        "INACTIVE" -> SubscriptionStatus.Inactive
        "UNKNOWN" -> SubscriptionStatus.Unknown
        else -> SubscriptionStatus.Unknown // Default case to handle unexpected values
      }
    }
  }
}

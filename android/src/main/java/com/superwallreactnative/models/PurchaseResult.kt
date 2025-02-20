package com.superwallreactnative.models

import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.delegate.PurchaseResult

class PurchaseResult {
  companion object {
    fun fromJson(json: ReadableMap): PurchaseResult {
      return when (json.getString("type")) {
        "cancelled" -> PurchaseResult.Cancelled()
        "purchased" -> PurchaseResult.Purchased()
        "pending" -> PurchaseResult.Pending()
        "failed" -> {
          // Assuming there's an error message for failed purchases
          val errorMessage = json.getString("error") ?: "Unknown error"
          PurchaseResult.Failed(errorMessage)
        }

        else -> PurchaseResult.Failed("Unknown Purchase Result type")
      }
    }
  }
}

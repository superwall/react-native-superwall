package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.paywall.presentation.internal.state.PaywallResult as SWPaywallResult

object PaywallResult {
    fun toJson(result: SWPaywallResult): ReadableMap {
        return Arguments.createMap().apply {
            when (result) {
                is SWPaywallResult.Purchased -> {
                    putString("type", "purchased")
                    putString("productId", result.productId)
                }
                is SWPaywallResult.Declined -> {
                    putString("type", "declined")
                }
                is SWPaywallResult.Restored -> {
                    putString("type", "restored")
                }
            }
        }
    }
}

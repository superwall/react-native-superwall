package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.product.Product

sealed class PaywallResult {
    data class Purchased(val product: Product) : PaywallResult()
    object Declined : PaywallResult()
    object Restored : PaywallResult()

    fun toJson(): ReadableMap {
        return Arguments.createMap().apply {
            when (this@PaywallResult) {
                is Purchased -> {
                    putString("type", "purchased")
                    putMap("product", product.toJson())
                }
                is Declined -> {
                    putString("type", "declined")
                }
                is Restored -> {
                    putString("type", "restored")
                }
            }
        }
    }

    companion object {
        fun fromJson(json: ReadableMap): PaywallResult {
            return when (json.getString("type")) {
                "purchased" -> {
                    val product = json.getMap("product")?.let { Product.fromJson(it) }
                        ?: throw IllegalArgumentException("Missing product in purchased result")
                    Purchased(product)
                }
                "declined" -> Declined
                "restored" -> Restored
                else -> throw IllegalArgumentException("Invalid PaywallResult type")
            }
        }
    }
}

package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.models.internal.RedemptionResult
import com.superwall.sdk.models.internal.RedemptionInfo
import com.superwall.sdk.models.internal.PurchaserInfo
import com.superwall.sdk.models.internal.StoreIdentifiers
import com.superwall.sdk.models.internal.ErrorInfo
import com.superwall.sdk.models.internal.ExpiredInfo
import com.superwall.sdk.models.internal.RedemptionOwnership
import com.superwall.sdk.models.entitlements.Entitlement

fun RedemptionResult.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("code", this.code)

    when (this) {
        is RedemptionResult.Success -> {
            map.putString("status", "SUCCESS")
            map.putMap("redemptionInfo", this.redemptionInfo.toJson())
        }
        is RedemptionResult.Error -> {
            map.putString("status", "ERROR")
            map.putMap("error", this.error.toJson())
        }
        is RedemptionResult.Expired -> {
            map.putString("status", "CODE_EXPIRED")
            map.putMap("expired", this.expired.toJson())
        }
        is RedemptionResult.InvalidCode -> {
            map.putString("status", "INVALID_CODE")
        }
        is RedemptionResult.ExpiredSubscription -> {
            map.putString("status", "EXPIRED_SUBSCRIPTION")
            map.putMap("redemptionInfo", this.redemptionInfo.toJson())
        }
    }

    return map
}

private fun RedemptionInfo.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putMap("ownership", this.ownership.toJson())
    map.putMap("purchaserInfo", this.purchaserInfo.toJson())
    this.paywallInfo?.let { map.putMap("paywallInfo", it.toJson()) }

    val entitlementsArray = Arguments.createArray()
    this.entitlements.forEach { entitlement ->
      val entitlementMap = Arguments.createMap()
      entitlementMap.putString("id", entitlement.id)
      entitlementsArray.pushMap(entitlementMap)
    }
    map.putArray("entitlements", entitlementsArray)

    return map
}

private fun PurchaserInfo.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("appUserId", this.appUserId)
    this.email?.let { map.putString("email", it) }
    map.putMap("storeIdentifiers", this.storeIdentifiers.toJson())
    return map
}

private fun StoreIdentifiers.toJson(): ReadableMap {
    val map = Arguments.createMap()
    when (this) {
        is StoreIdentifiers.Stripe -> {
            map.putString("store", "STRIPE")
            map.putString("stripeCustomerId", this.stripeCustomerId)
            val subscriptionIdsArray = Arguments.createArray()
            this.subscriptionIds.forEach { id ->
                subscriptionIdsArray.pushString(id)
            }
            map.putArray("stripeSubscriptionIds", subscriptionIdsArray)
        }
        is StoreIdentifiers.Unknown -> {
            map.putString("store", "UNKNOWN")
        }
    }
    return map
}

private fun ErrorInfo.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("message", this.message)
    return map
}

private fun ExpiredInfo.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putBoolean("resent", this.resent)
    this.obfuscatedEmail?.let { map.putString("obfuscatedEmail", it) }
    return map
}

private fun RedemptionOwnership.toJson(): ReadableMap {
    val map = Arguments.createMap()
    when (this) {
        is RedemptionOwnership.Device -> {
            map.putString("type", "DEVICE")
            map.putString("deviceId", this.deviceId)
        }
        is RedemptionOwnership.AppUser -> {
            map.putString("type", "APP_USER")
            map.putString("appUserId", this.appUserId)
        }
    }
    return map
}

private fun RedemptionResult.PaywallInfo.toJson(): ReadableMap {
    val map = Arguments.createMap()
    map.putString("identifier", this.identifier)
    map.putString("placementName", this.placementName)

    val placementParamsMap = Arguments.createMap()
    this.placementParams.forEach { (key, value) ->
        placementParamsMap.putString(key, value.toString())
    }
    map.putMap("placementParams", placementParamsMap)

    map.putString("variantId", this.variantId)
    map.putString("experimentId", this.experimentId)
    return map
}

package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.superwall.sdk.analytics.superwall.SuperwallPlacement
import com.superwall.sdk.store.abstractions.transactions.StoreTransaction

class SuperwallPlacement {
  companion object {
    fun toJson(superwallPlacement: SuperwallPlacement): ReadableMap {
      val map = Arguments.createMap()
      when (superwallPlacement) {
        is SuperwallPlacement.FirstSeen -> map.putString("placement", "firstSeen")
        is SuperwallPlacement.Reset -> map.putString("placement", "reset")
        is SuperwallPlacement.Restore.Start -> map.putString("placement", "restoreStart")
        is SuperwallPlacement.Restore.Complete -> map.putString("placement", "restoreComplete")
        is SuperwallPlacement.ConfigRefresh -> map.putString("placement", "configRefresh")
        is SuperwallPlacement.Restore.Fail -> {
          map.putString("placement", "restoreFail")
          map.putString("message", superwallPlacement.reason)
        }
        is SuperwallPlacement.AppOpen -> map.putString("placement", "appOpen")
        is SuperwallPlacement.AppLaunch -> map.putString("placement", "appLaunch")
        is SuperwallPlacement.IdentityAlias -> map.putString("placement", "identityAlias")
        is SuperwallPlacement.AppInstall -> map.putString("placement", "appInstall")
        is SuperwallPlacement.SessionStart -> map.putString("placement", "sessionStart")
        is SuperwallPlacement.DeviceAttributes -> {
          map.putString("placement", "deviceAttributes")
          // Assuming this.attributes is a Map<String, Any>
          map.putMap("attributes", convertMapToReadableMap(superwallPlacement.attributes))
        }
        is SuperwallPlacement.EntitlementStatusDidChange -> map.putString("placement", "entitlementStatusDidChange")
        is SuperwallPlacement.AppClose -> map.putString("placement", "appClose")
        is SuperwallPlacement.DeepLink -> {
          map.putString("placement", "deepLink")
          map.putString("url", superwallPlacement.uri.toString())
        }
        is SuperwallPlacement.TriggerFire -> {
          map.putString("placement", "triggerFire")
          map.putString("placementName", superwallPlacement.placementName)
          // Assuming result.toJson() returns Map<String, Any>
          val triggerResult = TriggerResult.toJson(superwallPlacement.result)
          map.putMap("result", triggerResult)
        }
        is SuperwallPlacement.PaywallOpen -> {
          map.putString("placement", "paywallOpen")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallClose -> {
          map.putString("placement", "paywallClose")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallDecline -> {
          map.putString("placement", "paywallDecline")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionStart -> {
          map.putString("placement", "transactionStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionFail -> {
          map.putString("placement", "transactionFail")
          map.putString("error", superwallPlacement.error.localizedMessage ?: "Error message unavailable")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionAbandon -> {
          map.putString("placement", "transactionAbandon")
          // Assuming this.product.toJson() returns a Map<String, Any>
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionComplete -> {
          map.putString("placement", "transactionComplete")
          // Assuming this.product.toJson() returns a Map<String, Any>
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())

          val transaction = superwallPlacement.transaction as? StoreTransaction
          transaction?.toJson()?.let {
            // Assuming transaction.toJson() returns a Map<String, Any>
            map.putMap("transaction", it)
          }
        }
        is SuperwallPlacement.SubscriptionStart -> {
          map.putString("placement", "subscriptionStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.FreeTrialStart -> {
          map.putString("placement", "freeTrialStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionRestore -> {
          map.putString("placement", "transactionRestore")
          map.putMap("restoreType", superwallPlacement.restoreType.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionTimeout -> {
          map.putString("placement", "transactionTimeout")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.UserAttributes -> {
          map.putString("placement", "userAttributes")
          map.putMap("attributes", convertMapToReadableMap(superwallPlacement.attributes))
        }
        is SuperwallPlacement.NonRecurringProductPurchase -> {
          map.putString("placement", "nonRecurringProductPurchase")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallResponseLoadStart -> {
          map.putString("placement", "paywallResponseLoadStart")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadNotFound -> {
          map.putString("placement", "paywallResponseLoadNotFound")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadFail -> {
          map.putString("placement", "paywallResponseLoadFail")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadComplete -> {
          map.putString("placement", "paywallResponseLoadComplete")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadStart -> {
          map.putString("placement", "paywallWebviewLoadStart")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadFail -> {
          map.putString("placement", "paywallWebviewLoadFail")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadComplete -> {
          map.putString("placement", "paywallWebviewLoadComplete")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadTimeout -> {
          map.putString("placement", "paywallWebviewLoadTimeout")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadStart -> {
          map.putString("placement", "paywallProductsLoadStart")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadFail -> {
          map.putString("placement", "paywallProductsLoadFail")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadComplete -> {
          map.putString("placement", "paywallProductsLoadComplete")
          map.putString("triggeredEventName", superwallPlacement.triggeredEventName ?: "")
        }
        is SuperwallPlacement.SurveyResponse -> {
          map.putString("placement", "surveyResponse")
          // Assuming survey.toJson() and selectedOption.toJson() return Map<String, Any>
          map.putMap("survey", superwallPlacement.survey.toJson())
          map.putMap("selectedOption", superwallPlacement.selectedOption.toJson())
          map.putString("customResponse", superwallPlacement.customResponse ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallPresentationRequest -> {
          map.putString("placement", "paywallPresentationRequest")
          // Assuming status.toJson() returns Map<String, Any>
          map.putMap("status", superwallPlacement.status.toJson())
          superwallPlacement.reason?.toJson()?.let {
            map.putMap("reason", it)
          }
        }
        is SuperwallPlacement.SurveyClose -> {
          map.putString("placement", "surveyClose")
        }
        is SuperwallPlacement.ConfigAttributes -> {
          map.putString("placement", "configAttributes")
        }
        is SuperwallPlacement.CustomPlacement -> {
          map.putString("placement", "customPlacement")
          map.putString("name", superwallPlacement.placementName)
          map.putMap("params", convertMapToReadableMap(superwallPlacement.params))
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadFallback -> {
          map.putString("placement", "paywallWebviewLoadFallback")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.ConfigFail -> {
          map.putString("placement", "configFail")
        }
        is SuperwallPlacement.ConfirmAllAssignments -> {
          map.putString("placement", "confirmAllAssignments")
        }
        is SuperwallPlacement.PaywallResourceLoadFail -> {
          map.putString("placement", "paywallResourceLoadFail")
          map.putString("url", superwallPlacement.url.toString())
          map.putString("error", superwallPlacement.error)
        }
        is SuperwallPlacement.ShimmerViewComplete -> {
          map.putString("placement", "shimmerViewComplete")
        }
        is SuperwallPlacement.ShimmerViewStart -> {
          map.putString("placement", "shimmerViewStart")
        }
        else -> {}
      }
      return map
    }
  }
}

fun convertMapToReadableMap(map: Map<String, Any?>): ReadableMap {
  val readableMap = Arguments.createMap()
  map.forEach { (key, value) ->
    when (value) {
      is String -> readableMap.putString(key, value)
      is Boolean -> readableMap.putBoolean(key, value)
      is Double -> readableMap.putDouble(key, value)
      is Int -> readableMap.putInt(key, value)
      is Map<*, *> -> {
        @Suppress("UNCHECKED_CAST")
        readableMap.putMap(key, convertMapToReadableMap(value as Map<String, Any?>))
      }
      else -> if (value == null) {
        readableMap.putNull(key)
      } // You can handle other types here if necessary
    }
  }
  return readableMap
}

fun convertReadableMapToMap(readableMap: ReadableMap): Map<String, Any?> {
  val map: MutableMap<String, Any?> = HashMap()
  val iterator = readableMap.keySetIterator()
  while (iterator.hasNextKey()) {
    val key = iterator.nextKey()
    when (val value = readableMap.getType(key)) {
      ReadableType.String -> map[key] = readableMap.getString(key)
      ReadableType.Boolean -> map[key] = readableMap.getBoolean(key)
      ReadableType.Number -> map[key] = readableMap.getDouble(key)
      ReadableType.Map -> map[key] = convertReadableMapToMap(readableMap.getMap(key)!!)
      ReadableType.Null -> map[key] = null
      else -> {}
    }
  }
  return map
}

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
        is SuperwallPlacement.FirstSeen -> map.putString("event", "firstSeen")
        is SuperwallPlacement.Reset -> map.putString("event", "reset")
        is SuperwallPlacement.Restore.Start -> map.putString("event", "restoreStart")
        is SuperwallPlacement.Restore.Complete -> map.putString("event", "restoreComplete")
        is SuperwallPlacement.ConfigRefresh -> map.putString("event", "configRefresh")
        is SuperwallPlacement.Restore.Fail -> {
          map.putString("event", "restoreFail")
          map.putString("message", superwallPlacement.reason)
        }
        is SuperwallPlacement.AppOpen -> map.putString("event", "appOpen")
        is SuperwallPlacement.AppLaunch -> map.putString("event", "appLaunch")
        is SuperwallPlacement.IdentityAlias -> map.putString("event", "identityAlias")
        is SuperwallPlacement.AppInstall -> map.putString("event", "appInstall")
        is SuperwallPlacement.SessionStart -> map.putString("event", "sessionStart")
        is SuperwallPlacement.DeviceAttributes -> {
          map.putString("event", "deviceAttributes")
          // Assuming this.attributes is a Map<String, Any>
          map.putMap("attributes", convertMapToReadableMap(superwallPlacement.attributes))
        }
        is SuperwallPlacement.SubscriptionStatusDidChange -> map.putString("event", "subscriptionStatusDidChange")
        is SuperwallPlacement.AppClose -> map.putString("event", "appClose")
        is SuperwallPlacement.DeepLink -> {
          map.putString("event", "deepLink")
          map.putString("url", superwallPlacement.uri.toString())
        }
        is SuperwallPlacement.TriggerFire -> {
          map.putString("event", "triggerFire")
          map.putString("placementName", superwallPlacement.placementName)
          // Assuming result.toJson() returns Map<String, Any>
          val triggerResult = TriggerResult.toJson(superwallPlacement.result)
          map.putMap("result", triggerResult)
        }
        is SuperwallPlacement.PaywallOpen -> {
          map.putString("event", "paywallOpen")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallClose -> {
          map.putString("event", "paywallClose")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallDecline -> {
          map.putString("event", "paywallDecline")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionStart -> {
          map.putString("event", "transactionStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionFail -> {
          map.putString("event", "transactionFail")
          map.putString("error", superwallPlacement.error.localizedMessage ?: "Error message unavailable")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionAbandon -> {
          map.putString("event", "transactionAbandon")
          // Assuming this.product.toJson() returns a Map<String, Any>
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionComplete -> {
          map.putString("event", "transactionComplete")
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
          map.putString("event", "subscriptionStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.FreeTrialStart -> {
          map.putString("event", "freeTrialStart")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionRestore -> {
          map.putString("event", "transactionRestore")
          map.putMap("restoreType", superwallPlacement.restoreType.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.TransactionTimeout -> {
          map.putString("event", "transactionTimeout")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.UserAttributes -> {
          map.putString("event", "userAttributes")
          map.putMap("attributes", convertMapToReadableMap(superwallPlacement.attributes))
        }
        is SuperwallPlacement.NonRecurringProductPurchase -> {
          map.putString("event", "nonRecurringProductPurchase")
          map.putMap("product", superwallPlacement.product.toJson())
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallResponseLoadStart -> {
          map.putString("event", "paywallResponseLoadStart")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadNotFound -> {
          map.putString("event", "paywallResponseLoadNotFound")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadFail -> {
          map.putString("event", "paywallResponseLoadFail")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
        }
        is SuperwallPlacement.PaywallResponseLoadComplete -> {
          map.putString("event", "paywallResponseLoadComplete")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadStart -> {
          map.putString("event", "paywallWebviewLoadStart")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadFail -> {
          map.putString("event", "paywallWebviewLoadFail")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadComplete -> {
          map.putString("event", "paywallWebviewLoadComplete")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadTimeout -> {
          map.putString("event", "paywallWebviewLoadTimeout")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadStart -> {
          map.putString("event", "paywallProductsLoadStart")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadFail -> {
          map.putString("event", "paywallProductsLoadFail")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallProductsLoadComplete -> {
          map.putString("event", "paywallProductsLoadComplete")
          map.putString("triggeredPlacementName", superwallPlacement.triggeredPlacementName ?: "")
        }
        is SuperwallPlacement.SurveyResponse -> {
          map.putString("event", "surveyResponse")
          // Assuming survey.toJson() and selectedOption.toJson() return Map<String, Any>
          map.putMap("survey", superwallPlacement.survey.toJson())
          map.putMap("selectedOption", superwallPlacement.selectedOption.toJson())
          map.putString("customResponse", superwallPlacement.customResponse ?: "")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallPresentationRequest -> {
          map.putString("event", "paywallPresentationRequest")
          // Assuming status.toJson() returns Map<String, Any>
          map.putMap("status", superwallPlacement.status.toJson())
          superwallPlacement.reason?.toJson()?.let {
            map.putMap("reason", it)
          }
        }
        is SuperwallPlacement.SurveyClose -> {
          map.putString("event", "surveyClose")
        }
        is SuperwallPlacement.ConfigAttributes -> {
          map.putString("event", "configAttributes")
        }
        is SuperwallPlacement.CustomPlacement -> {
          map.putString("event", "customPlacement")
          map.putString("name", superwallPlacement.placementName)
          map.putMap("params", convertMapToReadableMap(superwallPlacement.params))
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.PaywallWebviewLoadFallback -> {
          map.putString("event", "paywallWebviewLoadFallback")
          map.putMap("paywallInfo", superwallPlacement.paywallInfo.toJson())
        }
        is SuperwallPlacement.ConfigFail -> {
          map.putString("event", "configFail")
        }
        is SuperwallPlacement.ConfirmAllAssignments -> {
          map.putString("event", "confirmAllAssignments")
        }
        is SuperwallPlacement.PaywallResourceLoadFail -> {
          map.putString("event", "paywallResourceLoadFail")
          map.putString("url", superwallPlacement.url.toString())
          map.putString("error", superwallPlacement.error)
        }
        is SuperwallPlacement.ShimmerViewComplete -> {
          map.putString("event", "shimmerViewComplete")
        }
        is SuperwallPlacement.ShimmerViewStart -> {
          map.putString("event", "shimmerViewStart")
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

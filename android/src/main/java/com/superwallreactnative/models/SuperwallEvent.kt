package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableType
import com.superwall.sdk.analytics.superwall.SuperwallEvent
import com.superwall.sdk.store.abstractions.transactions.StoreTransaction

class SuperwallEvent {
  companion object {
    fun toJson(superwallEvent: SuperwallEvent): ReadableMap {
      val map = Arguments.createMap()
      when (superwallEvent) {
        is SuperwallEvent.FirstSeen -> map.putString("event", "firstSeen")
        is SuperwallEvent.Reset -> map.putString("event", "reset")
        is SuperwallEvent.Restore.Start -> map.putString("event", "restoreStart")
        is SuperwallEvent.Restore.Complete -> map.putString("event", "restoreComplete")
        is SuperwallEvent.ConfigRefresh -> map.putString("event", "configRefresh")
        is SuperwallEvent.Restore.Fail -> {
          map.putString("event", "restoreFail")
          map.putString("message", superwallEvent.reason)
        }
        is SuperwallEvent.AppOpen -> map.putString("event", "appOpen")
        is SuperwallEvent.AppLaunch -> map.putString("event", "appLaunch")
        is SuperwallEvent.IdentityAlias -> map.putString("event", "identityAlias")
        is SuperwallEvent.AppInstall -> map.putString("event", "appInstall")
        is SuperwallEvent.SessionStart -> map.putString("event", "sessionStart")
        is SuperwallEvent.DeviceAttributes -> {
          map.putString("event", "deviceAttributes")
          // Assuming this.attributes is a Map<String, Any>
          map.putMap("attributes", convertMapToReadableMap(superwallEvent.attributes))
        }
        is SuperwallEvent.SubscriptionStatusDidChange -> map.putString("event", "subscriptionStatusDidChange")
        is SuperwallEvent.AppClose -> map.putString("event", "appClose")
        is SuperwallEvent.DeepLink -> {
          map.putString("event", "deepLink")
          map.putString("url", superwallEvent.uri.toString())
        }
        is SuperwallEvent.TriggerFire -> {
          map.putString("event", "triggerFire")
          map.putString("eventName", superwallEvent.eventName)
          // Assuming result.toJson() returns Map<String, Any>
          val triggerResult = TriggerResult.toJson(superwallEvent.result)
          map.putMap("result", triggerResult)
        }
        is SuperwallEvent.PaywallOpen -> {
          map.putString("event", "paywallOpen")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallClose -> {
          map.putString("event", "paywallClose")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallDecline -> {
          map.putString("event", "paywallDecline")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionStart -> {
          map.putString("event", "transactionStart")
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionFail -> {
          map.putString("event", "transactionFail")
          map.putString("error", superwallEvent.error.localizedMessage ?: "Error message unavailable")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionAbandon -> {
          map.putString("event", "transactionAbandon")
          // Assuming this.product.toJson() returns a Map<String, Any>
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionComplete -> {
          map.putString("event", "transactionComplete")
          // Assuming this.product.toJson() returns a Map<String, Any>
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())

          val transaction = superwallEvent.transaction as? StoreTransaction
          transaction?.toJson()?.let {
            // Assuming transaction.toJson() returns a Map<String, Any>
            map.putMap("transaction", it)
          }
        }
        is SuperwallEvent.SubscriptionStart -> {
          map.putString("event", "subscriptionStart")
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.FreeTrialStart -> {
          map.putString("event", "freeTrialStart")
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionRestore -> {
          map.putString("event", "transactionRestore")
          map.putMap("restoreType", superwallEvent.restoreType.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.TransactionTimeout -> {
          map.putString("event", "transactionTimeout")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.UserAttributes -> {
          map.putString("event", "userAttributes")
          map.putMap("attributes", convertMapToReadableMap(superwallEvent.attributes))
        }
        is SuperwallEvent.NonRecurringProductPurchase -> {
          map.putString("event", "nonRecurringProductPurchase")
          map.putMap("product", superwallEvent.product.toJson())
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallResponseLoadStart -> {
          map.putString("event", "paywallResponseLoadStart")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
        }
        is SuperwallEvent.PaywallResponseLoadNotFound -> {
          map.putString("event", "paywallResponseLoadNotFound")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
        }
        is SuperwallEvent.PaywallResponseLoadFail -> {
          map.putString("event", "paywallResponseLoadFail")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
        }
        is SuperwallEvent.PaywallResponseLoadComplete -> {
          map.putString("event", "paywallResponseLoadComplete")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallWebviewLoadStart -> {
          map.putString("event", "paywallWebviewLoadStart")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallWebviewLoadFail -> {
          map.putString("event", "paywallWebviewLoadFail")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallWebviewLoadComplete -> {
          map.putString("event", "paywallWebviewLoadComplete")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallWebviewLoadTimeout -> {
          map.putString("event", "paywallWebviewLoadTimeout")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallProductsLoadStart -> {
          map.putString("event", "paywallProductsLoadStart")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallProductsLoadFail -> {
          map.putString("event", "paywallProductsLoadFail")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallProductsLoadComplete -> {
          map.putString("event", "paywallProductsLoadComplete")
          map.putString("triggeredEventName", superwallEvent.triggeredEventName ?: "")
        }
        is SuperwallEvent.SurveyResponse -> {
          map.putString("event", "surveyResponse")
          // Assuming survey.toJson() and selectedOption.toJson() return Map<String, Any>
          map.putMap("survey", superwallEvent.survey.toJson())
          map.putMap("selectedOption", superwallEvent.selectedOption.toJson())
          map.putString("customResponse", superwallEvent.customResponse ?: "")
          map.putMap("paywallInfo", superwallEvent.paywallInfo.toJson())
        }
        is SuperwallEvent.PaywallPresentationRequest -> {
          map.putString("event", "paywallPresentationRequest")
          // Assuming status.toJson() returns Map<String, Any>
          map.putMap("status", superwallEvent.status.toJson())
          superwallEvent.reason?.toJson()?.let {
            map.putMap("reason", it)
          }
        }
        is SuperwallEvent.SurveyClose -> {
          map.putString("event", "surveyClose")
        }
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

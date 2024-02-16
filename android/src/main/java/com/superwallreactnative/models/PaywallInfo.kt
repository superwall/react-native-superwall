package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.paywall.presentation.PaywallInfo

class PaywallInfo {
  companion object {
    fun toJson(paywallInfo: PaywallInfo): ReadableMap {
      val map = Arguments.createMap()

      map.putString("databaseId", paywallInfo.databaseId)
      map.putString("identifier", paywallInfo.identifier)
      map.putString("name", paywallInfo.name)
      map.putString("url", paywallInfo.url.toString())
      paywallInfo.experiment?.let {
        map.putMap("experiment", Experiment.toJson(it))
      }
      paywallInfo.triggerSessionId?.let { map.putString("triggerSessionId", it) }

      val productsArray = Arguments.createArray()
      paywallInfo.products.forEach { product ->
        val productMap = Arguments.createMap()
        productMap.putString("type", product.type.toString())
        productMap.putString("id", product.id)
        productsArray.pushMap(productMap)
      }
      map.putArray("products", productsArray)

      val productIdsArray = Arguments.createArray()
      paywallInfo.productIds.forEach { productId ->
        productIdsArray.pushString(productId)
      }
      map.putArray("productIds", productIdsArray)

      paywallInfo.presentedByEventWithName?.let { map.putString("presentedByEventWithName", it) }
      paywallInfo.presentedByEventWithId?.let { map.putString("presentedByEventWithId", it) }
      paywallInfo.presentedByEventAt?.let { map.putString("presentedByEventAt", it) }
      map.putString("presentedBy", paywallInfo.presentedBy)
      paywallInfo.presentationSourceType?.let { map.putString("presentationSourceType", it) }
      paywallInfo.responseLoadStartTime?.let { map.putString("responseLoadStartTime", it) }
      paywallInfo.responseLoadCompleteTime?.let { map.putString("responseLoadCompleteTime", it) }
      paywallInfo.responseLoadFailTime?.let { map.putString("responseLoadFailTime", it) }
      paywallInfo.responseLoadDuration?.let { map.putDouble("responseLoadDuration", it.toDouble()) }

      map.putBoolean("isFreeTrialAvailable", paywallInfo.isFreeTrialAvailable)
      map.putString("featureGatingBehavior", paywallInfo.featureGatingBehavior.toString())
      map.putString("closeReason", paywallInfo.closeReason.toString())

      paywallInfo.webViewLoadStartTime?.let { map.putString("webViewLoadStartTime", it) }
      paywallInfo.webViewLoadCompleteTime?.let { map.putString("webViewLoadCompleteTime", it) }
      paywallInfo.webViewLoadFailTime?.let { map.putString("webViewLoadFailTime", it) }
      paywallInfo.webViewLoadDuration?.let { map.putDouble("webViewLoadDuration", it.toDouble()) }

      paywallInfo.productsLoadStartTime?.let { map.putString("productsLoadStartTime", it) }
      paywallInfo.productsLoadCompleteTime?.let { map.putString("productsLoadCompleteTime", it) }
      paywallInfo.productsLoadFailTime?.let { map.putString("productsLoadFailTime", it) }
      paywallInfo.productsLoadDuration?.let { map.putDouble("productsLoadDuration", it.toDouble()) }

      paywallInfo.paywalljsVersion?.let { map.putString("paywalljsVersion", it) }

      val computedPropertyRequestsArray = Arguments.createArray()
      paywallInfo.computedPropertyRequests.forEach { request ->
        val computedPropertyRequestsMap = Arguments.createMap()
        computedPropertyRequestsMap.putString("eventName", request.eventName)
        computedPropertyRequestsMap.putString("type", request.type.toString())
        computedPropertyRequestsArray.pushMap(computedPropertyRequestsMap)
      }
      map.putArray("computedPropertyRequests", computedPropertyRequestsArray)

      val surveysArray = Arguments.createArray()
      paywallInfo.surveys.forEach { survey ->
        val surveysMap = Arguments.createMap()
        surveysMap.putString("id", survey.id)
        surveysMap.putString("message", survey.message)
        surveysMap.putString("title", survey.title)
        surveysMap.putString("assignmentKey", survey.assignmentKey)
        surveysMap.putBoolean("includeCloseOption", survey.includeCloseOption)
        surveysMap.putBoolean("includeOtherOption", survey.includeOtherOption)
        surveysMap.putDouble("presentationProbability", survey.presentationProbability)
        surveysMap.putString("presentationCondition", survey.presentationCondition.rawValue)

        val optionsArray = Arguments.createArray()
        survey.options.forEach { option ->
          val optionsMap = Arguments.createMap()
          optionsMap.putString("id", option.id)
          optionsMap.putString("title", option.title)
          optionsArray.pushMap(optionsMap)
        }
        surveysMap.putArray("options", optionsArray)

        surveysArray.pushMap(surveysMap)
      }
      map.putArray("surveys", surveysArray)

      val localNotificationsArray = Arguments.createArray()
      paywallInfo.localNotifications.forEach { notification ->
        val notificationsMap = Arguments.createMap()
        notificationsMap.putInt("id", notification.id)
        notificationsMap.putString("title", notification.title)
        notificationsMap.putString("body", notification.body)
        notificationsMap.putString("type", notification.type.toString())
        notificationsMap.putDouble("delay", notification.delay.toDouble())
        localNotificationsArray.pushMap(notificationsMap)
      }
      map.putArray("localNotifications", localNotificationsArray)

      return map
    }
  }
}

package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.paywall.presentation.PaywallInfo

fun PaywallInfo.toJson(): ReadableMap {
  val map = Arguments.createMap()

  map.putString("identifier", this.identifier)
  map.putString("name", this.name)
  map.putString("url", this.url.toString())
  this.experiment?.let {
    map.putMap("experiment", Experiment.toJson(it))
  }

  val productsArray = Arguments.createArray()
  this.products.forEach { product ->
    val productMap = Arguments.createMap()
    productMap.putString("type", product.type.toString())
    productMap.putString("id", product.fullProductId)
    productsArray.pushMap(productMap)
  }
  map.putArray("products", productsArray)

  val productIdsArray = Arguments.createArray()
  this.productIds.forEach { productId ->
    productIdsArray.pushString(productId)
  }
  map.putArray("productIds", productIdsArray)

  this.presentedByEventWithName?.let { map.putString("presentedByEventWithName", it) }
  this.presentedByEventWithId?.let { map.putString("presentedByEventWithId", it) }
  this.presentedByEventAt?.let { map.putString("presentedByEventAt", it) }
  map.putString("presentedBy", this.presentedBy)
  this.presentationSourceType?.let { map.putString("presentationSourceType", it) }
  this.responseLoadStartTime?.let { map.putString("responseLoadStartTime", it) }
  this.responseLoadCompleteTime?.let { map.putString("responseLoadCompleteTime", it) }
  this.responseLoadFailTime?.let { map.putString("responseLoadFailTime", it) }
  this.responseLoadDuration?.let { map.putDouble("responseLoadDuration", it.toDouble()) }

  map.putBoolean("isFreeTrialAvailable", this.isFreeTrialAvailable)
  map.putString("featureGatingBehavior", this.featureGatingBehavior.rawValue())
  map.putString("closeReason", this.closeReason.rawValue())

  this.webViewLoadStartTime?.let { map.putString("webViewLoadStartTime", it) }
  this.webViewLoadCompleteTime?.let { map.putString("webViewLoadCompleteTime", it) }
  this.webViewLoadFailTime?.let { map.putString("webViewLoadFailTime", it) }
  this.webViewLoadDuration?.let { map.putDouble("webViewLoadDuration", it.toDouble()) }

  this.productsLoadStartTime?.let { map.putString("productsLoadStartTime", it) }
  this.productsLoadCompleteTime?.let { map.putString("productsLoadCompleteTime", it) }
  this.productsLoadFailTime?.let { map.putString("productsLoadFailTime", it) }
  this.productsLoadDuration?.let { map.putDouble("productsLoadDuration", it.toDouble()) }

  this.paywalljsVersion?.let { map.putString("paywalljsVersion", it) }

  val computedPropertyRequestsArray = Arguments.createArray()
  this.computedPropertyRequests.forEach { request ->
    val computedPropertyRequestsMap = Arguments.createMap()
    computedPropertyRequestsMap.putString("placementName", request.eventName)
    computedPropertyRequestsMap.putString("type", request.type.toString())
    computedPropertyRequestsArray.pushMap(computedPropertyRequestsMap)
  }
  map.putArray("computedPropertyRequests", computedPropertyRequestsArray)

  val surveysArray = Arguments.createArray()
  this.surveys.forEach { survey ->
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
  this.localNotifications.forEach { notification ->
    val notificationsMap = Arguments.createMap()
    notificationsMap.putInt("id", notification.id)
    notificationsMap.putString("title", notification.title)
    notificationsMap.putString("body", notification.body)
    notificationsMap.putString("type", notification.type.toJson())
    notificationsMap.putDouble("delay", notification.delay.toDouble())
    localNotificationsArray.pushMap(notificationsMap)
  }
  map.putArray("localNotifications", localNotificationsArray)

  return map
}

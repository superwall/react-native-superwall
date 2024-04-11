package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.config.models.Survey
import com.superwall.sdk.config.models.SurveyOption
import com.superwall.sdk.config.models.SurveyShowCondition

fun Survey.toJson(): ReadableMap {
  val map = Arguments.createMap()

  map.putString("id", this.id)
  map.putString("assignmentKey", this.assignmentKey)
  map.putString("title", this.title)
  map.putString("message", this.message)

  val optionsArray = Arguments.createArray()
  this.options.forEach {
    optionsArray.pushMap(it.toJson())
  }
  map.putArray("options", optionsArray)

  map.putString("presentationCondition", this.presentationCondition.toJson())
  map.putDouble("presentationProbability", this.presentationProbability)
  map.putBoolean("includeOtherOption", this.includeOtherOption)
  map.putBoolean("includeCloseOption", this.includeCloseOption)

  return map
}

fun SurveyOption.toJson(): ReadableMap {
  val map = Arguments.createMap()

  map.putString("id", this.id)
  map.putString("title", this.title)

  return map
}

fun SurveyShowCondition.toJson(): String {
  return when (this) {
    SurveyShowCondition.ON_MANUAL_CLOSE -> "ON_MANUAL_CLOSE"
    SurveyShowCondition.ON_PURCHASE -> "ON_PURCHASE"
  }
}

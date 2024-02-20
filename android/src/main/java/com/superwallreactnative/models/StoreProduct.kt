package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.store.abstractions.product.StoreProduct
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Locale

fun StoreProduct.toJson(): ReadableMap {
  val map = Arguments.createMap()
  val dateFormatter = DateTimeFormatter.ISO_DATE_TIME.withLocale(Locale.getDefault())

  map.putString("productIdentifier", productIdentifier)
  map.putString("localizedPrice", localizedPrice)
  map.putString("localizedSubscriptionPeriod", localizedSubscriptionPeriod)
  map.putString("period", period)
  map.putString("periodly", periodly)
  map.putInt("periodWeeks", periodWeeks)
  map.putString("periodWeeksString", periodWeeksString)
  map.putInt("periodMonths", periodMonths)
  map.putString("periodMonthsString", periodMonthsString)
  map.putInt("periodYears", periodYears)
  map.putString("periodYearsString", periodYearsString)
  map.putInt("periodDays", periodDays)
  map.putString("periodDaysString", periodDaysString)
  map.putString("dailyPrice", dailyPrice)
  map.putString("weeklyPrice", weeklyPrice)
  map.putString("monthlyPrice", monthlyPrice)
  map.putString("yearlyPrice", yearlyPrice)
  map.putBoolean("hasFreeTrial", hasFreeTrial)
  map.putString("trialPeriodEndDateString", trialPeriodEndDateString)
  map.putString("localizedTrialPeriodPrice", localizedTrialPeriodPrice)
  map.putDouble("trialPeriodPrice", trialPeriodPrice.toDouble())
  map.putInt("trialPeriodDays", trialPeriodDays)
  map.putString("trialPeriodDaysString", trialPeriodDaysString)
  map.putInt("trialPeriodWeeks", trialPeriodWeeks)
  map.putString("trialPeriodWeeksString", trialPeriodWeeksString)
  map.putInt("trialPeriodMonths", trialPeriodMonths)
  map.putString("trialPeriodMonthsString", trialPeriodMonthsString)
  map.putInt("trialPeriodYears", trialPeriodYears)
  map.putString("trialPeriodYearsString", trialPeriodYearsString)
  map.putString("trialPeriodText", trialPeriodText)
  map.putString("locale", locale)
  map.putString("languageCode", languageCode)
  map.putString("currencyCode", currencyCode)
  map.putString("currencySymbol", currencySymbol)
  map.putString("regionCode", regionCode)
  map.putDouble("price", price.toDouble())

  trialPeriodEndDate?.let {
    val instant = it.toInstant()
    map.putString("trialPeriodEndDate", instant.atZone(ZoneId.systemDefault()).format(dateFormatter))
  } ?: map.putNull("trialPeriodEndDate")

  return map
}

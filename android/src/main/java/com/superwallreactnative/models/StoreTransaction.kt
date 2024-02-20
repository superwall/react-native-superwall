package com.superwallreactnative.models

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.store.abstractions.transactions.StoreTransaction
import java.time.ZoneId
import java.time.format.DateTimeFormatter
import java.util.Date

fun StoreTransaction.toJson(): ReadableMap {
  val map = Arguments.createMap()
  val dateFormatter = DateTimeFormatter.ISO_INSTANT

  fun Date.toIsoString(): String? = this.toInstant()
    .atZone(ZoneId.systemDefault())
    .format(dateFormatter)

  map.putString("configRequestId", configRequestId)
  map.putString("appSessionId", appSessionId)
  map.putString("transactionDate", transactionDate?.toIsoString())
  map.putString("originalTransactionIdentifier", originalTransactionIdentifier)
  map.putString("storeTransactionId", storeTransactionId)
  map.putString("originalTransactionDate", originalTransactionDate?.toIsoString())
  map.putString("webOrderLineItemID", webOrderLineItemID)
  map.putString("appBundleId", appBundleId)
  map.putString("subscriptionGroupId", subscriptionGroupId)
  map.putBoolean("isUpgraded", isUpgraded ?: false)
  map.putString("expirationDate", expirationDate?.toIsoString())
  map.putString("offerId", offerId)
  map.putString("revocationDate", revocationDate?.toIsoString())

  return map
}

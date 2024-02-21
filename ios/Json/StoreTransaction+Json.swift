import SuperwallKit

extension StoreTransaction {
  func toJson() -> [String: Any?] {
    let dateFormatter = ISO8601DateFormatter()

    return [
      "configRequestId": configRequestId,
      "appSessionId": appSessionId,
      "transactionDate": transactionDate.map { dateFormatter.string(from: $0) },
      "originalTransactionIdentifier": originalTransactionIdentifier,
      "storeTransactionId": storeTransactionId,
      "originalTransactionDate": originalTransactionDate.map { dateFormatter.string(from: $0) },
      "webOrderLineItemID": webOrderLineItemID,
      "appBundleId": appBundleId,
      "subscriptionGroupId": subscriptionGroupId,
      "isUpgraded": isUpgraded,
      "expirationDate": expirationDate.map { dateFormatter.string(from: $0) },
      "offerId": offerId,
      "revocationDate": revocationDate.map { dateFormatter.string(from: $0) }
    ]
  }
}

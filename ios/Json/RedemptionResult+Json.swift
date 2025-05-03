//
//  RedemptionResult+Json.swift
//  SuperwallKit
//
//  Created on 14/03/2025.
//

import SuperwallKit

extension RedemptionResult {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    switch self {
    case let .success(code, redemptionInfo):
      map["status"] = "SUCCESS"
      map["code"] = code
      map["redemptionInfo"] = redemptionInfo.toJson()
    case let .error(code, error):
      map["status"] = "ERROR"
      map["code"] = code
      map["error"] = error.toJson()
    case let .expiredCode(code, info):
      map["status"] = "CODE_EXPIRED"
      map["code"] = code
      map["expired"] = info.toJson()
    case .invalidCode(let code):
      map["status"] = "INVALID_CODE"
      map["code"] = code
    case let .expiredSubscription(code, redemptionInfo):
      map["status"] = "EXPIRED_SUBSCRIPTION"
      map["code"] = code
      map["redemptionInfo"] = redemptionInfo.toJson()
    }

    return map
  }
}

extension RedemptionResult.ErrorInfo {
  func toJson() -> [String: Any] {
    return ["message": self.message]
  }
}

extension RedemptionResult.ExpiredCodeInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["resent"] = self.resent
    if let obfuscatedEmail = self.obfuscatedEmail {
      map["obfuscatedEmail"] = obfuscatedEmail
    }

    return map
  }
}

extension RedemptionResult.RedemptionInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["ownership"] = self.ownership.toJson()
    map["purchaserInfo"] = self.purchaserInfo.toJson()
    if let paywallInfo = self.paywallInfo {
      map["paywallInfo"] = paywallInfo.toJson()
    }
    map["entitlements"] = self.entitlements.map { $0.toJson() }

    return map
  }
}

extension RedemptionResult.RedemptionInfo.Ownership {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    switch self {
    case .appUser(let appUserId):
      map["type"] = "APP_USER"
      map["appUserId"] = appUserId
    case .device(let deviceId):
      map["type"] = "DEVICE"
      map["deviceId"] = deviceId
    }

    return map
  }
}

extension RedemptionResult.RedemptionInfo.PurchaserInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["appUserId"] = self.appUserId
    if let email = self.email {
      map["email"] = email
    }
    map["storeIdentifiers"] = self.storeIdentifiers.toJson()

    return map
  }
}

extension RedemptionResult.RedemptionInfo.PurchaserInfo.StoreIdentifiers {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    switch self {
    case let .stripe(customerId, subscriptionIds):
      map["store"] = "STRIPE"
      map["stripeCustomerId"] = customerId
      map["stripeSubscriptionIds"] = subscriptionIds
    case let .unknown(store, additionalInfo):
      map["store"] = store
      // Add all the additional info to the map
      for (key, value) in additionalInfo {
        map[key] = value
      }
    }

    return map
  }
}

extension RedemptionResult.RedemptionInfo.PaywallInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["identifier"] = self.identifier
    map["placementName"] = self.placementName
    map["placementParams"] = self.placementParams
    map["variantId"] = self.variantId
    map["experimentId"] = self.experimentId

    return map
  }
}

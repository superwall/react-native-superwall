import SuperwallKit

extension SuperwallPlacementInfo {
  func toJson() -> [String: Any] {
    return [
      "placement": placement.toJson(),
      "params": params,
    ]
  }
}

extension SuperwallPlacement {
  func toJson() -> [String: Any] {
    switch self {
    case .firstSeen:
      return ["placement": "firstSeen"]
    case .reset:
      return ["placement": "reset"]
    case .configRefresh:
      return ["placement": "configRefresh"]
    case .appOpen:
      return ["placement": "appOpen"]
    case .appLaunch:
      return ["placement": "appLaunch"]
    case .identityAlias:
      return ["placement": "identityAlias"]
    case .appInstall:
      return ["placement": "appInstall"]
    case .sessionStart:
      return ["placement": "sessionStart"]
    case .deviceAttributes(let attributes):
      return ["placement": "deviceAttributes", "attributes": attributes]
    case .entitlementStatusDidChange:
      return ["placement": "entitlementStatusDidChange"]
    case .appClose:
      return ["placement": "appClose"]
    case .deepLink(let url):
      return ["placement": "deepLink", "url": url.absoluteString]
    case .triggerFire(let placementName, let result):
      return [
        "placement": "triggerFire", "placementName": placementName, "result": result.toJson(),
      ]
    case .paywallOpen(let paywallInfo):
      return ["placement": "paywallOpen", "paywallInfo": paywallInfo.toJson()]
    case .paywallClose(let paywallInfo):
      return ["placement": "paywallClose", "paywallInfo": paywallInfo.toJson()]
    case .paywallDecline(let paywallInfo):
      return ["placement": "paywallDecline", "paywallInfo": paywallInfo.toJson()]
    case .transactionStart(let product, let paywallInfo):
      return [
        "placement": "transactionStart", "product": product.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .transactionFail(let error, let paywallInfo):
      return [
        "placement": "transactionFail", "error": error.localizedDescription,
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .transactionAbandon(let product, let paywallInfo):
      return [
        "placement": "transactionAbandon", "product": product.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .transactionComplete(let transaction, let product, let type, let paywallInfo):
      var json: [String: Any] = [
        "placement": "transactionComplete",
        "product": product.toJson(),
        "type": type.description,
        "paywallInfo": paywallInfo.toJson(),
      ]
      let transactionJson = transaction?.toJson()
      if let transactionJson {
        json["transaction"] = transactionJson
      }
      return json
    case .subscriptionStart(let product, let paywallInfo):
      return [
        "placement": "subscriptionStart", "product": product.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .freeTrialStart(let product, let paywallInfo):
      return [
        "placement": "freeTrialStart", "product": product.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .transactionRestore(let restoreType, let paywallInfo):
      return [
        "placement": "transactionRestore", "restoreType": restoreType.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .transactionTimeout(let paywallInfo):
      return ["placement": "transactionTimeout", "paywallInfo": paywallInfo.toJson()]
    case .userAttributes(let attributes):
      return ["placement": "userAttributes", "attributes": attributes]
    case .nonRecurringProductPurchase(let product, let paywallInfo):
      return [
        "placement": "nonRecurringProductPurchase", "product": product.toJson(),
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .paywallResponseLoadStart(let triggeredEventName):
      return [
        "placement": "paywallResponseLoadStart", "triggeredEventName": triggeredEventName ?? "",
      ]
    case .paywallResponseLoadNotFound(let triggeredEventName):
      return [
        "placement": "paywallResponseLoadNotFound", "triggeredEventName": triggeredEventName ?? "",
      ]
    case .paywallResponseLoadFail(let triggeredEventName):
      return [
        "placement": "paywallResponseLoadFail", "triggeredEventName": triggeredEventName ?? "",
      ]
    case .paywallResponseLoadComplete(let triggeredEventName, let paywallInfo):
      return [
        "placement": "paywallResponseLoadComplete", "triggeredEventName": triggeredEventName ?? "",
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .paywallWebviewLoadStart(let paywallInfo):
      return ["placement": "paywallWebviewLoadStart", "paywallInfo": paywallInfo.toJson()]
    case .paywallWebviewLoadFail(let paywallInfo):
      return ["placement": "paywallWebviewLoadFail", "paywallInfotoJson": paywallInfo.toJson()]
    case .paywallWebviewLoadComplete(let paywallInfo):
      return ["placement": "paywallWebviewLoadComplete", "paywallInfo": paywallInfo.toJson()]
    case .paywallWebviewLoadTimeout(let paywallInfo):
      return ["placement": "paywallWebviewLoadTimeout", "paywallInfo": paywallInfo.toJson()]
    case .paywallWebviewLoadFallback(let paywallInfo):
      return ["placement": "paywallWebviewLoadFallback", "paywallInfo": paywallInfo.toJson()]
    case .paywallProductsLoadStart(let triggeredEventName, let paywallInfo):
      return [
        "placement": "paywallProductsLoadStart", "triggeredEventName": triggeredEventName ?? "",
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .paywallProductsLoadFail(let triggeredEventName, let paywallInfo):
      return [
        "placement": "paywallProductsLoadFail", "triggeredEventName": triggeredEventName ?? "",
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .paywallProductsLoadComplete(let triggeredEventName):
      return [
        "placement": "paywallProductsLoadComplete", "triggeredEventName": triggeredEventName ?? "",
      ]
    case let .paywallProductsLoadRetry(triggeredEventName, paywallInfo, attempt):
      return [
        "placement": "paywallProductsLoadRetry",
        "triggeredEventName": triggeredEventName ?? "",
        "paywallInfo": paywallInfo.toJson(),
        "attempt": attempt,
      ]
    case .surveyResponse(let survey, let selectedOption, let customResponse, let paywallInfo):
      return [
        "placement": "surveyResponse", "survey": survey.toJson(),
        "selectedOption": selectedOption.toJson(), "customResponse": customResponse ?? "",
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .paywallPresentationRequest(let status, let reason):
      var json: [String: Any] = [
        "placement": "paywallPresentationRequest", "status": status.toJson(),
      ]
      let reasonJson = reason?.toJson()
      if let reasonJson {
        json["reason"] = reasonJson
      }
      return json
    case .touchesBegan:
      return ["placement": "touchesBegan"]
    case .surveyClose:
      return ["placement": "surveyClose"]
    case .restoreStart:
      return ["placement": "restoreStart"]
    case .restoreComplete:
      return ["placement": "restoreComplete"]
    case .restoreFail(let message):
      return ["placement": "restoreFail", "message": message]
    case .customPlacement(let name, let params, let paywallInfo):
      return [
        "placement": "customPlacement",
        "name": name,
        "params": params,
        "paywallInfo": paywallInfo.toJson(),
      ]
    case .configAttributes:
      return ["placement": "configAttributes"]
    case .confirmAllAssignments:
      return ["placement": "confirmAllAssignments"]
    case .configFail:
      return ["placement": "configFail"]
    case .adServicesTokenRequestStart:
      return ["placement": "adServicesTokenRequestStart"]
    case .adServicesTokenRequestFail(let error):
      return ["placement": "adServicesTokenRequestFail", "error": error.localizedDescription]
    case .adServicesTokenRequestComplete(let token):
      return ["placement": "adServicesTokenRequestComplete", "token": token]
    case .shimmerViewStart:
      return ["placement": "shimmerViewStart"]
    case .shimmerViewComplete:
      return ["placement": "shimmerViewComplete"]
    }
  }
}

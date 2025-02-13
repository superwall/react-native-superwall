//
//  PaywallInfo+Json.swift
//  Superwall
//
//  Created by Yusuf Tör on 21/02/2024.
//

import SuperwallKit

extension PaywallInfo {
  func toJson() -> [String: Any] {
    var map: [String: Any] = [:]

    map["identifier"] = self.identifier
    map["name"] = self.name
    map["url"] = self.url.absoluteString
    if let experiment = self.experiment {
      map["experiment"] = experiment.toJson()
    }

    let products = products.map({ product in
      var dictionary: [String: Any] = [
        "id": product.id,
        "entitlements": product.entitlements.map { $0.toJson() },
      ]
      if let name = product.name {
        dictionary["name"] = name
      }
      return dictionary
    })
    map["products"] = products

    let productIdsArray = self.productIds
    map["productIds"] = productIdsArray

    if let presentedByPlacementWithName = self.presentedByPlacementWithName {
      map["presentedByEventWithName"] = presentedByPlacementWithName
    }
    if let presentedByPlacementWithId = self.presentedByPlacementWithId {
      map["presentedByEventWithId"] = presentedByPlacementWithId
    }
    if let presentedByPlacementAt = self.presentedByPlacementAt {
      map["presentedByEventAt"] = presentedByPlacementAt
    }
    map["presentedBy"] = self.presentedBy
    if let presentationSourceType = self.presentationSourceType {
      map["presentationSourceType"] = presentationSourceType
    }
    if let responseLoadStartTime = self.responseLoadStartTime {
      map["responseLoadStartTime"] = responseLoadStartTime
    }
    if let responseLoadCompleteTime = self.responseLoadCompleteTime {
      map["responseLoadCompleteTime"] = responseLoadCompleteTime
    }
    if let responseLoadFailTime = self.responseLoadFailTime {
      map["responseLoadFailTime"] = responseLoadFailTime
    }
    if let responseLoadDuration = self.responseLoadDuration {
      map["responseLoadDuration"] = responseLoadDuration
    }

    map["isFreeTrialAvailable"] = self.isFreeTrialAvailable
    map["featureGatingBehavior"] = self.featureGatingBehavior.toJson()
    map["closeReason"] = self.closeReason.toJson()

    if let webViewLoadStartTime = self.webViewLoadStartTime {
      map["webViewLoadStartTime"] = webViewLoadStartTime
    }
    if let webViewLoadCompleteTime = self.webViewLoadCompleteTime {
      map["webViewLoadCompleteTime"] = webViewLoadCompleteTime
    }
    if let webViewLoadFailTime = self.webViewLoadFailTime {
      map["webViewLoadFailTime"] = webViewLoadFailTime
    }
    if let webViewLoadDuration = self.webViewLoadDuration {
      map["webViewLoadDuration"] = webViewLoadDuration
    }

    if let productsLoadStartTime = self.productsLoadStartTime {
      map["productsLoadStartTime"] = productsLoadStartTime
    }
    if let productsLoadCompleteTime = self.productsLoadCompleteTime {
      map["productsLoadCompleteTime"] = productsLoadCompleteTime
    }
    if let productsLoadFailTime = self.productsLoadFailTime {
      map["productsLoadFailTime"] = productsLoadFailTime
    }
    if let productsLoadDuration = self.productsLoadDuration {
      map["productsLoadDuration"] = productsLoadDuration
    }

    if let paywalljsVersion = self.paywalljsVersion {
      map["paywalljsVersion"] = paywalljsVersion
    }

    let computedPropertyRequestsArray: [[String: Any]] = self.computedPropertyRequests.map {
      request in
      [
        "placementName": request.placementName,
        "type": request.type.rawValue,
      ]
    }
    map["computedPropertyRequests"] = computedPropertyRequestsArray

    let surveysArray: [[String: Any]] = self.surveys.map { survey in
      var surveyMap: [String: Any] = [
        "id": survey.id,
        "message": survey.message,
        "title": survey.title,
        "assignmentKey": survey.assignmentKey,
        "includeCloseOption": survey.includeCloseOption,
        "includeOtherOption": survey.includeOtherOption,
        "presentationProbability": survey.presentationProbability,
        "presentationCondition": survey.presentationCondition.toJson(),
      ]

      let optionsArray: [[String: Any]] = survey.options.map { option in
        [
          "id": option.id,
          "title": option.title,
        ]
      }
      surveyMap["options"] = optionsArray

      return surveyMap
    }
    map["surveys"] = surveysArray

    let localNotificationsArray: [[String: Any]] = self.localNotifications.map { notification in
      [
        "title": notification.title,
        "body": notification.body,
        "type": notification.type.toJson(),
        "delay": notification.delay,
      ]
    }
    map["localNotifications"] = localNotificationsArray

    return map
  }
}

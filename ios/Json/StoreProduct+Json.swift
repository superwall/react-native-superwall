import SuperwallKit

extension StoreProduct {
  func toJson() -> [String: Any?] {
    var json: [String: Any?] = [
      "productIdentifier": productIdentifier,
      "subscriptionGroupIdentifier": subscriptionGroupIdentifier,
      "localizedPrice": localizedPrice,
      "localizedSubscriptionPeriod": localizedSubscriptionPeriod,
      "period": period,
      "periodly": periodly,
      "periodWeeks": periodWeeks,
      "periodWeeksString": periodWeeksString,
      "periodMonths": periodMonths,
      "periodMonthsString": periodMonthsString,
      "periodYears": periodYears,
      "periodYearsString": periodYearsString,
      "periodDays": periodDays,
      "periodDaysString": periodDaysString,
      "dailyPrice": dailyPrice,
      "weeklyPrice": weeklyPrice,
      "monthlyPrice": monthlyPrice,
      "yearlyPrice": yearlyPrice,
      "hasFreeTrial": hasFreeTrial,
      "trialPeriodEndDateString": trialPeriodEndDateString,
      "localizedTrialPeriodPrice": localizedTrialPeriodPrice,
      "trialPeriodPrice": trialPeriodPrice,
      "trialPeriodDays": trialPeriodDays,
      "trialPeriodDaysString": trialPeriodDaysString,
      "trialPeriodWeeks": trialPeriodWeeks,
      "trialPeriodWeeksString": trialPeriodWeeksString,
      "trialPeriodMonths": trialPeriodMonths,
      "trialPeriodMonthsString": trialPeriodMonthsString,
      "trialPeriodYears": trialPeriodYears,
      "trialPeriodYearsString": trialPeriodYearsString,
      "trialPeriodText": trialPeriodText,
      "locale": locale,
      "languageCode": languageCode,
      "currencyCode": currencyCode,
      "currencySymbol": currencySymbol,
      "regionCode": regionCode,
      "price": price
    ]

    if #available(iOS 14.0, macOS 11.0, tvOS 14.0, watchOS 8.0, *) {
      json["isFamilyShareable"] = isFamilyShareable
    }

    if let trialPeriodEndDate = trialPeriodEndDate {
      let dateFormatter = ISO8601DateFormatter()
      json["trialPeriodEndDate"] = dateFormatter.string(from: trialPeriodEndDate)
    } else {
      json["trialPeriodEndDate"] = nil
    }

    return json
  }
}

import SuperwallKit

extension PaywallOptions {
  static func fromJson(_ dictionary: [String: Any]) -> PaywallOptions? {
    guard
      let isHapticFeedbackEnabled = dictionary["isHapticFeedbackEnabled"] as? Bool,
      let restoreFailedValue = dictionary["restoreFailed"] as? [String: Any],
      let shouldShowPurchaseFailureAlert = dictionary["shouldShowPurchaseFailureAlert"] as? Bool,
      let shouldPreload = dictionary["shouldPreload"] as? Bool,
      let automaticallyDismiss = dictionary["automaticallyDismiss"] as? Bool,
      let transactionBackgroundViewValue = dictionary["transactionBackgroundView"] as? String else {
      return nil
    }

    guard let restoreFailed = PaywallOptions.RestoreFailed.fromJson(restoreFailedValue),
          let transactionBackgroundView = PaywallOptions.TransactionBackgroundView.fromJson(transactionBackgroundViewValue) else {
      return nil
    }

    let paywallOptions = PaywallOptions()
    paywallOptions.isHapticFeedbackEnabled = isHapticFeedbackEnabled
    paywallOptions.restoreFailed = restoreFailed
    paywallOptions.shouldShowPurchaseFailureAlert = shouldShowPurchaseFailureAlert
    paywallOptions.shouldPreload = shouldPreload
    paywallOptions.automaticallyDismiss = automaticallyDismiss
    paywallOptions.transactionBackgroundView = transactionBackgroundView

    return paywallOptions
  }
}

extension PaywallOptions.RestoreFailed {
  static func fromJson(_ dictionary: [String: Any]) -> PaywallOptions.RestoreFailed? {
    guard let title = dictionary["title"] as? String,
          let message = dictionary["message"] as? String,
          let closeButtonTitle = dictionary["closeButtonTitle"] as? String else {
      return nil
    }

    let restoreFailed = PaywallOptions.RestoreFailed()
    restoreFailed.title = title
    restoreFailed.message = message
    restoreFailed.closeButtonTitle = closeButtonTitle

    return restoreFailed
  }
}

extension PaywallOptions.TransactionBackgroundView {
  static func fromJson(_ json: String) -> PaywallOptions.TransactionBackgroundView? {
    switch json {
      case "spinner":
        return PaywallOptions.TransactionBackgroundView.spinner
      case "none":
        return PaywallOptions.TransactionBackgroundView.none
      default:
        return nil
    }
  }
}

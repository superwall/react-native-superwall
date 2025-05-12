import SuperwallKit

extension SuperwallOptions {
  static func fromJson(_ dictionary: [String: Any]) -> SuperwallOptions? {
    guard
      let paywallsValue = dictionary["paywalls"] as? [String: Any],
      let paywalls = PaywallOptions.fromJson(paywallsValue),
      let networkEnvironmentValue = dictionary["networkEnvironment"] as? String,
      let networkEnvironment = NetworkEnvironment.fromJson(networkEnvironmentValue),
      let isExternalDataCollectionEnabled = dictionary["isExternalDataCollectionEnabled"] as? Bool,
      let loggingValue = dictionary["logging"] as? [String: Any],
      let logging = Logging.fromJson(loggingValue)
    else {
      return nil
    }

    let localeIdentifier = dictionary["localeIdentifier"] as? String
    let isGameControllerEnabled = dictionary["isGameControllerEnabled"] as? Bool ?? false
    let storeKitVersion = dictionary["storeKitVersion"] as? String

    let superwallOptions = SuperwallOptions()
    superwallOptions.paywalls = paywalls
    superwallOptions.networkEnvironment = networkEnvironment
    superwallOptions.isExternalDataCollectionEnabled = isExternalDataCollectionEnabled
    superwallOptions.localeIdentifier = localeIdentifier
    superwallOptions.isGameControllerEnabled = isGameControllerEnabled
    superwallOptions.logging = logging
    if let storeKitVersion = storeKitVersion {
      superwallOptions.storeKitVersion = storeKitVersion == "STOREKIT1" ? .storeKit1 : .storeKit2
    }

    return superwallOptions
  }
}

extension SuperwallOptions.NetworkEnvironment {
  static func fromJson(_ json: String) -> SuperwallOptions.NetworkEnvironment? {
    switch json {
      case "release":
        return .release
      case "releaseCandidate":
        return .releaseCandidate
      case "developer":
        return .developer
      default:
        return nil
    }
  }
}

extension SuperwallOptions.Logging {
  static func fromJson(_ dictionary: [String: Any]) -> SuperwallOptions.Logging? {
    guard
      let levelString = dictionary["level"] as? String,
      let level = LogLevel.fromJson(levelString),
      let scopeStrings = dictionary["scopes"] as? [String]
    else {
      return nil
    }

    let scopes = Set(scopeStrings.compactMap { LogScope.fromJson($0) })

    let logging = SuperwallOptions.Logging()
    logging.level = level
    logging.scopes = scopes

    return logging
  }
}

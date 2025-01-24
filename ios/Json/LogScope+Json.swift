import SuperwallKit

extension LogScope {
  static func fromJson(_ json: String) -> LogScope? {
    switch json {
    case "localizationManager":
      return .localizationManager
    case "bounceButton":
      return .bounceButton
    case "coreData":
      return .coreData
    case "configManager":
      return .configManager
    case "identityManager":
      return .identityManager
    case "debugManager":
      return .debugManager
    case "debugViewController":
      return .debugViewController
    case "localizationViewController":
      return .localizationViewController
    case "gameControllerManager":
      return .gameControllerManager
    case "device":
      return .device
    case "network":
      return .network
    case "paywallEvents":
      return .paywallEvents
    case "productsManager":
      return .productsManager
    case "storeKitManager":
      return .storeKitManager
    case "placements":
      return .placements
    case "receipts":
      return .receipts
    case "superwallCore":
      return .superwallCore
    case "paywallPresentation":
      return .paywallPresentation
    case "paywallTransactions":
      return .transactions
    case "paywallViewController":
      return .paywallViewController
    case "cache":
      return .cache
    case "all":
      return .all
    default:
      return nil
    }
  }
}

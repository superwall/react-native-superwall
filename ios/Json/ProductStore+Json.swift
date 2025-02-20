import SuperwallKit

extension ProductStore {
  func toJson() -> String {
    switch self {
    case .appStore:
      return "APP_STORE"
    }
  }
}

import SuperwallKit

extension IdentityOptions {
  static func fromJson(_ json: [String: Any]?) -> IdentityOptions? {
    guard let json = json else {
      return nil
    }
    if let restorePaywallAssignments = json["restorePaywallAssignments"] as? Bool {
      return IdentityOptions(restorePaywallAssignments: restorePaywallAssignments)
    } else {
      return IdentityOptions()
    }
  }

}

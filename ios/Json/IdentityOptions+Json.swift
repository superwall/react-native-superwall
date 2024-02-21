import SuperwallKit

extension IdentityOptions {
  static func fromJson(_ json: [String: Any]) -> IdentityOptions? {
    if let restorePaywallAssignments = json["restorePaywallAssignments"] as? Bool {
      return IdentityOptions(restorePaywallAssignments: restorePaywallAssignments)
    } else {
      return IdentityOptions()
    }
  }

}

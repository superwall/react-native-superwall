import SuperwallKit

extension LocalNotification {
  func toJson() -> [String: Any] {
    var json: [String: Any] = [
      "type": self.type.toJson(),
      "title": self.title,
      "body": self.body,
      "delay": self.delay
    ]

    if let subtitle = self.subtitle {
      json["subtitle"] = subtitle
    }

    return json
  }
}

extension LocalNotificationType {
  func toJson() -> String {
    switch self {
      case .trialStarted:
        return "trialStarted"
    }
  }
}

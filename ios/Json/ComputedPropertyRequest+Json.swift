import SuperwallKit

extension ComputedPropertyRequest {
  func toJson() -> [String: Any] {
    return [
      "type": self.type.toJson(),
      "eventName": self.eventName
    ]
  }
}

extension ComputedPropertyRequest.ComputedPropertyRequestType {
  func toJson() -> String {
    switch self {
      case .minutesSince:
        return "minutesSince"
      case .hoursSince:
        return "hoursSince"
      case .daysSince:
        return "daysSince"
      case .monthsSince:
        return "monthsSince"
      case .yearsSince:
        return "yearsSince"
    }
  }
}

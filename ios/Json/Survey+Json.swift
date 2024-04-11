import SuperwallKit

extension Survey {
  func toJson() -> [String: Any] {
    return [
      "id": self.id,
      "assignmentKey": self.assignmentKey,
      "title": self.title,
      "message": self.message,
      "options": self.options.map { $0.toJson() },
      "presentationCondition": self.presentationCondition.toJson(),
      "presentationProbability": self.presentationProbability,
      "includeOtherOption": self.includeOtherOption,
      "includeCloseOption": self.includeCloseOption
    ]
  }
}

extension SurveyOption {
  func toJson() -> [String: Any] {
    return [
      "id": self.id,
      "title": self.title
    ]
  }
}

extension SurveyShowCondition {
  func toJson() -> String {
    switch self {
      case .onManualClose:
        return "ON_MANUAL_CLOSE"
      case .onPurchase:
        return "ON_PURCHASE"
    }
  }
}


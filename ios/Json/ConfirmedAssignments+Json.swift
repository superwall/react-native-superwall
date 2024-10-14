import Foundation
import SuperwallKit

extension ConfirmedAssignment {
    func toJson() -> [String: Any] {
        return [
            "experimentId": experimentId,
            "variant": variant.type.rawValue
        ]
    }
    
    static func fromJson(_ json: [String: Any]) -> ConfirmedAssignment? {
        guard let experimentId = json["experimentId"] as? Experiment.ID,
              let variantTypeString = json["variant"] as? String,
              let variantType = Experiment.Variant.VariantType(rawValue: variantTypeString) else {
            return nil
        }
        let variant = Experiment.Variant(id: "", type: variantType, paywallId: nil)
        return ConfirmedAssignment(experimentId: experimentId, variant: variant)
    }
}
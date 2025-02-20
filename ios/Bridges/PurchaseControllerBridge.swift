import StoreKit
import SuperwallKit

final class PurchaseControllerBridge: PurchaseController {
  static let shared = PurchaseControllerBridge()

  var purchaseCompletion: ((PurchaseResult) -> Void)?
  var restoreCompletion: ((RestorationResult) -> Void)?

  private init() {}

  func purchase(product: StoreProduct) async -> PurchaseResult {
    SuperwallReactNative.emitter.sendEvent(
      withName: "purchaseFromAppStore",
      body: ["productId": product.productIdentifier]
    )
    return await withCheckedContinuation { continuation in
      self.purchaseCompletion = { [weak self] result in
        continuation.resume(returning: result)
        self?.purchaseCompletion = nil
      }
    }
  }

  func restorePurchases() async -> RestorationResult {
    SuperwallReactNative.emitter.sendEvent(withName: "restore", body: nil)

    return await withCheckedContinuation { continuation in
      self.restoreCompletion = { [weak self] result in
        continuation.resume(returning: result)
        self?.restoreCompletion = nil
      }
    }
  }
}

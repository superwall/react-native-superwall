import SuperwallKit

@objc(SuperwallReactNative)
class SuperwallReactNative: RCTEventEmitter {
  static var emitter: RCTEventEmitter!
  private var purchaseController = PurchaseControllerBridge()
  private var delegate: SuperwallDelegateBridge?

  override init() {
    super.init()
    SuperwallReactNative.emitter = self
  }

  override func supportedEvents() -> [String]! {
    return [
      "purchaseFromAppStore",
      "purchaseFromGooglePlay",
      "restore",
      "paywallPresentationHandler",
      "subscriptionStatusDidChange",
      "handleSuperwallEvent",
      "handleCustomPaywallAction",
      "willDismissPaywall",
      "willPresentPaywall",
      "didDismissPaywall",
      "didPresentPaywall",
      "paywallWillOpenDeepLink",
      "handleLog"
    ]
  }

  @objc(configure:options:usingPurchaseController:withResolver:withRejecter:)
  func configure(
    apiKey: String,
    options: [String: Any]?,
    usingPurchaseController: Bool,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    var superwallOptions: SuperwallOptions?

    if let options = options {
      superwallOptions = SuperwallOptions.fromJson(options)
    }

    Superwall.configure(
      apiKey: apiKey,
      purchaseController: usingPurchaseController ? purchaseController : nil,
      options: superwallOptions
    ) {
      resolve(nil)
    }

    Superwall.shared.setPlatformWrapper("React Native");
  }

  @objc(identify:options:)
  func identify(userId: String, options: [String: Any]?) {
    let options = IdentityOptions.fromJson(options)
    Superwall.shared.identify(userId: userId, options: options)
  }

  @objc(reset)
  func reset() {
    Superwall.shared.reset()
  }

  @objc(setDelegate:)
  func setDelegate(isUndefined: Bool) {
    self.delegate = isUndefined ? nil : SuperwallDelegateBridge()
    Superwall.shared.delegate = self.delegate
  }

  @objc(register:params:handlerId:withResolver:withRejecter:)
  func register(
    event: String,
    params: [String: Any]?,
    handlerId: String?,
    resolve: RCTPromiseResolveBlock?,
    reject: RCTPromiseRejectBlock?
  ) {
    var handler: PaywallPresentationHandler?

    if let handlerId = handlerId {
      handler = PaywallPresentationHandler()

      handler?.onPresent { [weak self] paywallInfo in
        let data = [
          "paywallInfoJson": paywallInfo.toJson(),
          "method": "onPresent",
          "handlerId": handlerId
        ] as [String : Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onDismiss { [weak self] paywallInfo in
        let data = [
          "paywallInfoJson": paywallInfo.toJson(),
          "method": "onDismiss",
          "handlerId": handlerId
        ] as [String : Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onError { [weak self] error in
        let data = [
          "method": "onError",
          "errorString": error.localizedDescription,
          "handlerId": handlerId
        ] as [String : Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onSkip { [weak self] reason in
        let data = [
          "method": "onSkip",
          "skippedReason": reason.toJson(),
          "handlerId": handlerId
        ] as [String : Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }
    }

    Superwall.shared.register(
      event: event,
      params: params,
      handler: handler
    ) {
      resolve?(nil)
    }
  }

  @objc(getSubscriptionStatus:withRejecter:)
  func getSubscriptionStatus(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let subscriptionStatus = Superwall.shared.subscriptionStatus.toString()
    resolve(subscriptionStatus)
  }

  @objc(setSubscriptionStatus:)
  func setSubscriptionStatus(status: String) {
    let subscriptionStatus = SubscriptionStatus.fromString(subscriptionStatus: status)
    Superwall.shared.subscriptionStatus = subscriptionStatus
  }

  @objc(didPurchase:)
  func didPurchase(result: [String: Any]) {
    guard let purchaseResult = PurchaseResult.fromJson(result) else {
      return
    }
    purchaseController.purchaseCompletion?(purchaseResult)
  }

  @objc(didRestore:)
  func didRestore(result: [String: Any]) {
    guard let restorationResult = RestorationResult.fromJson(result) else {
      return
    }
    purchaseController.restoreCompletion?(restorationResult)
  }
}

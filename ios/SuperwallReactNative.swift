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
      "paywallWillOpenURL",
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

  @objc(configure:options:usingPurchaseController:sdkVersion:withResolver:withRejecter:)
  func configure(
    apiKey: String,
    options: [String: Any]?,
    usingPurchaseController: Bool,
    sdkVersion: String,
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

    Superwall.shared.setPlatformWrapper("React Native", version: sdkVersion)
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

  @objc(getConfigurationStatus:withRejecter:)
  func getConfigurationStatus(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let configurationStatus = Superwall.shared.configurationStatus.toString()
    resolve(configurationStatus)
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

  @objc(getUserAttributes:withRejecter:)
  func getUserAttributes(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let attributes = Superwall.shared.userAttributes
    resolve(attributes)
  }

  @objc(setUserAttributes:)
  func setUserAttributes(userAttributes: NSDictionary) {
    var swiftDictionary: [String: Any?] = [:]
    let keys = userAttributes.allKeys.compactMap { $0 as? String }
    for key in keys {
      let keyValue = userAttributes.value(forKey: key) as Any?
      swiftDictionary[key] = keyValue
    }
    Superwall.shared.setUserAttributes(swiftDictionary)
  }

  @objc(handleDeepLink:withResolver:withRejecter:)
  func handleDeepLink(
    url: String,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    guard let url = URL(string: url) else {
      return resolve(false)
    }
    let result = Superwall.shared.handleDeepLink(url)
    resolve(result)
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

  @objc(dismiss:withRejecter:)
  func dismiss(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Superwall.shared.dismiss {
      resolve(nil)
    }
  }

  @objc(confirmAllAssignments:withRejecter:)
  func confirmAllAssignments(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
      Superwall.shared.confirmAllAssignments() { assignments in
        resolve(assignments.map { $0.toJson() })
      }
  }
}

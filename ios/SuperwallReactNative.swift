import Combine
import SuperwallKit

@objc(SuperwallReactNative)
class SuperwallReactNative: RCTEventEmitter {
  static var emitter: RCTEventEmitter!
  private let purchaseController = PurchaseControllerBridge.shared
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
      "willRedeemLink",
      "didRedeemLink",
      "restore",
      "paywallPresentationHandler",
      "subscriptionStatusDidChange",
      "observeSubscriptionStatus",
      "handleSuperwallEvent",
      "handleCustomPaywallAction",
      "willDismissPaywall",
      "willPresentPaywall",
      "didDismissPaywall",
      "didPresentPaywall",
      "paywallWillOpenDeepLink",
      "handleLog",
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
    placement: String,
    params: [String: Any]?,
    handlerId: String?,
    resolve: RCTPromiseResolveBlock?,
    reject: RCTPromiseRejectBlock?
  ) {
    var handler: PaywallPresentationHandler?

    if let handlerId = handlerId {
      handler = PaywallPresentationHandler()

      handler?.onPresent { [weak self] paywallInfo in
        let data =
          [
            "paywallInfoJson": paywallInfo.toJson(),
            "method": "onPresent",
            "handlerId": handlerId,
          ] as [String: Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onDismiss { [weak self] paywallInfo, result in
        let data =
          [
            "paywallInfoJson": paywallInfo.toJson(),
            "result": result.toJson(),
            "method": "onDismiss",
            "handlerId": handlerId,
          ] as [String: Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onError { [weak self] error in
        let data =
          [
            "method": "onError",
            "errorString": error.localizedDescription,
            "handlerId": handlerId,
          ] as [String: Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }

      handler?.onSkip { [weak self] reason in
        let data =
          [
            "method": "onSkip",
            "skippedReason": reason.toJson(),
            "handlerId": handlerId,
          ] as [String: Any]
        self?.sendEvent(withName: "paywallPresentationHandler", body: data)
      }
    }

    Superwall.shared.register(
      placement: placement,
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

  @objc(getAssignments:withRejecter:)
  func getAssignments(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let assignments = Superwall.shared.getAssignments()
    resolve(assignments.map { $0.toJson() })
  }

  @objc(getEntitlements:withRejecter:)
  func getEntitlements(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let entitlements = Superwall.shared.entitlements.toJson()
    resolve(entitlements)
  }

  @objc(getSubscriptionStatus:withRejecter:)
  func getSubscriptionStatus(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    let subscriptionStatus = Superwall.shared.subscriptionStatus
    resolve([
      "subscriptionStatus": subscriptionStatus.toJson()
    ])
  }

  @objc(setSubscriptionStatus:)
  func setSubscriptionStatus(status: NSDictionary) {
    guard let statusDict = status as? [String: Any] else {
      return
    }
    let statusString = (statusDict["status"] as? String)?.uppercased() ?? "UNKNOWN"
    let subscriptionStatus: SubscriptionStatus

    switch statusString {
    case "UNKNOWN":
      subscriptionStatus = .unknown
    case "INACTIVE":
      subscriptionStatus = .inactive
    case "ACTIVE":
      if let entitlementsArray = statusDict["entitlements"] as? [[String: Any]] {
        let entitlementsSet: Set<Entitlement> = Set(
          entitlementsArray.compactMap { item in
            if let id = item["id"] as? String {
              return Entitlement(id: id)
            }
            return nil
          }
        )
        subscriptionStatus = .active(entitlementsSet)
      } else {
        subscriptionStatus = .inactive
      }
    default:
      subscriptionStatus = .unknown
    }

    Superwall.shared.subscriptionStatus = subscriptionStatus
  }

  @objc(setInterfaceStyle:)
  func setInterfaceStyle(style: String?) {
    var interfaceStyle: InterfaceStyle?
    if let style = style {
      interfaceStyle = InterfaceStyle.fromString(style: style)
    }
    Superwall.shared.setInterfaceStyle(to: interfaceStyle)
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
    Superwall.shared.confirmAllAssignments { assignments in
      resolve(assignments.map { $0.toJson() })
    }
  }

  @objc(getPresentationResult:params:withResolver:withRejecter:)
  func getPresentationResult(
    placement: String,
    params: [String: Any]?,
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Superwall.shared.getPresentationResult(forPlacement: placement, params: params) { result in
      resolve(result.toJson())
    }
  }

  @objc(preloadPaywalls:)
  func preloadPaywalls(forPlacements placementNames: [String]) {
    Superwall.shared.preloadPaywalls(forPlacements: Set(placementNames))
  }

  @objc(preloadAllPaywalls)
  func preloadAllPaywalls() {
    Superwall.shared.preloadAllPaywalls()
  }

  @objc(setLogLevel:)
  func setLogLevel(level: String) {
    let logLevel = LogLevel.fromJson(level)
    if let logLevel = logLevel {
      Superwall.shared.logLevel = logLevel
    }
  }

  @objc(observeSubscriptionStatus:withRejecter:)
  func observeSubscriptionStatus(
    resolve: @escaping RCTPromiseResolveBlock,
    reject: @escaping RCTPromiseRejectBlock
  ) {
    Superwall.shared.$subscriptionStatus
      .receive(on: DispatchQueue.main)
      .subscribe(
        Subscribers.Sink(
          receiveCompletion: { _ in },
          receiveValue: { [weak self] status in
            self?.sendEvent(withName: "observeSubscriptionStatus", body: status.toJson())
          })
      )
    resolve(nil)
  }
}

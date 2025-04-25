package com.superwallreactnative

import android.app.Application
import android.net.Uri
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.superwall.sdk.Superwall
import com.superwall.sdk.identity.identify
import com.superwall.sdk.identity.setUserAttributes
import com.superwall.sdk.misc.ActivityProvider
import com.superwall.sdk.misc.sdkVersion
import com.superwall.sdk.models.entitlements.SubscriptionStatus
import com.superwall.sdk.models.entitlements.Entitlement
import com.superwall.sdk.paywall.presentation.PaywallPresentationHandler
import com.superwall.sdk.paywall.presentation.dismiss
import com.superwall.sdk.paywall.presentation.get_presentation_result.getPresentationResult
import com.superwall.sdk.paywall.presentation.register
import com.superwallreactnative.bridges.SuperwallDelegateBridge
import com.superwallreactnative.models.IdentityOptions
import com.superwallreactnative.models.PaywallResult
import com.superwallreactnative.models.PaywallSkippedReason
import com.superwallreactnative.models.PurchaseResult
import com.superwallreactnative.models.RestorationResult
import com.superwallreactnative.models.InterfaceStyle
import com.superwallreactnative.models.SuperwallOptions
import com.superwallreactnative.models.convertMapToReadableMap
import com.superwallreactnative.models.convertReadableMapToMap
import com.superwallreactnative.models.asString
import com.superwallreactnative.models.toJson
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.flow.first
import com.superwall.sdk.config.models.ConfigurationStatus
import com.superwall.sdk.logger.LogLevel

class SuperwallReactNativeModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val purchaseController: PurchaseControllerBridge = PurchaseControllerProvider.getInstance(reactContext)
  private var delegate: SuperwallDelegateBridge? = null
  private val activityProvider: ActivityProvider = ReactNativeActivityProvider(reactContext)

  override fun getName(): String {
    return "SuperwallReactNative"
  }

  @ReactMethod
  fun configure(
    apiKey: String,
    options: ReadableMap? = null,
    usingPurchaseController: Boolean,
    platformVersion: String,
    completion: Promise
  ) {
    val options = options?.let {
      SuperwallOptions.fromJson(options)
    }

    if (usingPurchaseController) {
      Superwall.configure(
        applicationContext = reactContext.applicationContext as Application,
        apiKey = apiKey,
        options = options,
        activityProvider = activityProvider,
        purchaseController = purchaseController,
        completion = {
          completion.resolve(null)
        }
      )
    } else  {
      Superwall.configure(
        applicationContext = reactContext.applicationContext as Application,
        apiKey = apiKey,
        options = options,
        activityProvider = activityProvider,
        completion = {
          completion.resolve(null)
        }
      )
    }

    Superwall.instance.setPlatformWrapper(
      "React Native",
      version = sdkVersion
    );
  }

  @ReactMethod
  fun setDelegate(isUndefined: Boolean) {
    this.delegate = if (isUndefined) null else SuperwallDelegateBridge(reactContext)
    Superwall.instance.delegate = this.delegate
  }

  @ReactMethod
  fun register(
    event: String,
    params: ReadableMap?,
    handlerId: String?,
    feature: Promise?
  ) {
    var handler: PaywallPresentationHandler? = null

    if (handlerId != null) {
      handler = PaywallPresentationHandler()
      handler.onPresent {
        val data = Arguments.createMap().apply {
          putMap("paywallInfoJson", it.toJson()) // Implement this method
          putString("method", "onPresent")
          putString("handlerId", handlerId)
        }

        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("paywallPresentationHandler", data)
      }

      handler.onDismiss { it, result ->
        val data = Arguments.createMap().apply {
          putMap("paywallInfoJson", it.toJson()) // Implement this method
          putString("method", "onDismiss")
          putString("handlerId", handlerId)
          putMap("result", PaywallResult.toJson(result))
        }

        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("paywallPresentationHandler", data)
      }

      handler.onError {
        val data = Arguments.createMap().apply {
          putString("method", "onError")
          putString("errorString", it.message)
          putString("handlerId", handlerId)
        }

        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("paywallPresentationHandler", data)
      }

      handler.onSkip {
        val data = Arguments.createMap().apply {
          putString("method", "onSkip")
          putMap("skippedReason", PaywallSkippedReason.toJson(it))
          putString("handlerId", handlerId)
        }

        reactContext
          .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
          .emit("paywallPresentationHandler", data)
      }
    }

    Superwall.instance.register(
      placement = event,
      params = params?.toHashMap()?.toMap() as? Map<String, Any>,
      handler = handler,
      feature = {
        feature?.resolve(null)
      }
    )
  }

  @ReactMethod
  fun addListener(eventName: String) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @ReactMethod
  fun identify(userId: String, options: ReadableMap?) {
    val options = if (options != null) IdentityOptions.fromJson(options) else null
    Superwall.instance.identify(
      userId = userId,
      options = options
    )
  }

  @ReactMethod
  fun reset() {
    Superwall.instance.reset()
  }

  @ReactMethod
  fun getConfigurationStatus(promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      if(!Superwall.hasInitialized.first())
        promise.resolve(ConfigurationStatus.Pending.asString())
      else
        promise.resolve(Superwall.instance.configurationState.asString())
    }
  }

  @ReactMethod
  fun getSubscriptionStatus(promise: Promise) {
    val subscriptionStatus = Superwall.instance.subscriptionStatus.value.toJson()
    val result = Arguments.createMap().apply {
      putMap("subscriptionStatus", subscriptionStatus)
    }
    promise.resolve(result)
  }

  @ReactMethod
  fun getEntitlements(promise: Promise) {
    val entitlements = Superwall.instance.entitlements
    val map = Arguments.createMap().apply {
      putArray("all", Arguments.createArray().apply {
        entitlements.all.forEach { entitlement ->
          pushMap(Arguments.createMap().apply {
            putString("id", entitlement.id)
          })
        }
      })
      putArray("inactive", Arguments.createArray().apply {
        entitlements.inactive.forEach { entitlement ->
          pushMap(Arguments.createMap().apply {
            putString("id", entitlement.id)
          })
        }
      })
      putArray("active", Arguments.createArray().apply {
        entitlements.active.forEach { entitlement ->
          pushMap(Arguments.createMap().apply {
            putString("id", entitlement.id)
          })
        }
      })
    }
    promise.resolve(map)
  }

  @ReactMethod
  fun setSubscriptionStatus(status: ReadableMap) {
    val statusString = status.getString("status") ?: "UNKNOWN"

    val subscriptionStatus: SubscriptionStatus = when (statusString.uppercase()) {
        "UNKNOWN" -> SubscriptionStatus.Unknown
        "INACTIVE" -> SubscriptionStatus.Inactive
        "ACTIVE" -> {
            val entitlements = status.getArray("entitlements")
            val entitlementsSet = entitlements?.toArrayList()?.mapNotNull { item ->
                when (item) {
                    is HashMap<*, *> -> {  // Change from ReadableMap to HashMap
                        val id = (item["id"] as? String)
                        id?.let { Entitlement(it) }
                    }
                    else -> null
                }
            }?.toSet() ?: emptySet()
            SubscriptionStatus.Active(entitlementsSet)
        }
        else -> SubscriptionStatus.Unknown
    }

    Superwall.instance.setSubscriptionStatus(subscriptionStatus)
  }

  @ReactMethod
  fun getUserAttributes(promise: Promise) {
    val attributes = convertMapToReadableMap(Superwall.instance.userAttributes)
    promise.resolve(attributes)
  }

  @ReactMethod
  fun setUserAttributes(userAttributes: ReadableMap) {
    val attributesMap = convertReadableMapToMap(userAttributes)
    Superwall.instance.setUserAttributes(attributesMap)
  }

  @ReactMethod
  fun handleDeepLink(
    url: String,
    promise: Promise
  ) {
    val url = Uri.parse(url)
    promise.resolve(Superwall.instance.handleDeepLink(url).getOrNull()?:false)
  }

  @ReactMethod
  fun setInterfaceStyle(
    interfaceStyle: String
  ) {
    val interfaceStyle = InterfaceStyle.fromString(interfaceStyle)
    Superwall.instance.setInterfaceStyle(interfaceStyle)
  }

  @ReactMethod
  fun didPurchase(result: ReadableMap) {
    val purchaseResult = PurchaseResult.fromJson(result)
    purchaseController.purchasePromise?.complete(purchaseResult)
  }

  @ReactMethod
  fun didRestore(result: ReadableMap) {
    val restorationResult = RestorationResult.fromJson(result)
    purchaseController.restorePromise?.complete(restorationResult)
  }

  @ReactMethod
  fun dismiss(promise: Promise) {
    CoroutineScope(Dispatchers.Main).launch {
      Superwall.instance.dismiss()
      promise.resolve(null)
    }
  }

  @ReactMethod
  fun confirmAllAssignments(promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      Superwall.instance.confirmAllAssignments().fold({
        launch(Dispatchers.Main) {
          val array = Arguments.createArray()
          it.forEach { assignment ->
            array.pushMap(assignment.toJson())
          }
          promise.resolve(array)
        }
      },{
        promise.reject("Error", it.message)
      })
    }
  }

  @ReactMethod
  fun getAssignments(promise: Promise) {
    CoroutineScope(Dispatchers.IO).launch {
      Superwall.instance.getAssignments().fold({
        launch(Dispatchers.Main) {
          val array = Arguments.createArray()
          it.forEach { assignment ->
            array.pushMap(assignment.toJson())
          }
          promise.resolve(array)
        }
      },{
        promise.reject("Error", it.message)
      })
    }
  }

  @ReactMethod
  fun getPresentationResult(
    event: String,
    params: ReadableMap?,
    promise: Promise
  ) {
    CoroutineScope(Dispatchers.IO).launch {
      Superwall.instance.getPresentationResult(event, params?.toHashMap()?.toMap() as? Map<String, Any>?).fold({
        launch(Dispatchers.Main) {
          promise.resolve(it.toJson())
        }
      }, {
        promise.reject("Error", it.message)
      })
    }
  }

  @ReactMethod
  fun preloadPaywalls(eventNames: ReadableArray) {
    val eventNames = eventNames?.toArrayList()?.toSet() as Set<String>
    Superwall.instance.preloadPaywalls(eventNames)
  }

  @ReactMethod
  fun preloadAllPaywalls(promise: Promise) {
    Superwall.instance.preloadAllPaywalls()
    promise.resolve(null)
  }

  @ReactMethod
  fun observeSubscriptionStatus(promise: Promise) {
    val scope = CoroutineScope(Dispatchers.IO)
    val mainScope = CoroutineScope(Dispatchers.Main)
    scope.launch {
      Superwall.instance.subscriptionStatus.collect {
        mainScope.launch {
          sendEvent(reactContext, "observeSubscriptionStatus", it.toJson())
        }
      }
    }
    promise.resolve(null)
  }

  @ReactMethod
  fun setLogLevel(level: String) {
    val logLevel = LogLevel.values().find { it.toString().equals(level, ignoreCase = true) }
      ?: LogLevel.warn
    Superwall.instance.logLevel = logLevel
  }

  private fun sendEvent(reactContext: ReactApplicationContext, eventName: String, params: ReadableMap) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }
}

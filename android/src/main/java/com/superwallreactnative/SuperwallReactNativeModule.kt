package com.superwallreactnative

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
import com.superwall.sdk.paywall.presentation.PaywallPresentationHandler
import com.superwall.sdk.paywall.presentation.dismiss
import com.superwall.sdk.paywall.presentation.get_presentation_result.getPresentationResult
import com.superwall.sdk.paywall.presentation.register
import com.superwallreactnative.bridges.SuperwallDelegateBridge
import com.superwallreactnative.models.IdentityOptions
import com.superwallreactnative.models.PaywallSkippedReason
import com.superwallreactnative.models.PurchaseResult
import com.superwallreactnative.models.RestorationResult
import com.superwallreactnative.models.SubscriptionStatus
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
        applicationContext = reactContext,
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
        applicationContext = reactContext,
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

      handler.onDismiss {
        val data = Arguments.createMap().apply {
          putMap("paywallInfoJson", it.toJson()) // Implement this method
          putString("method", "onDismiss")
          putString("handlerId", handlerId)
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
      event = event,
      params = params?.toHashMap(),
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
    promise.resolve(Superwall.instance.subscriptionStatus.value.toString())
  }

  @ReactMethod
  fun setSubscriptionStatus(status: String) {
    val subscriptionStatus = SubscriptionStatus.fromString(status)
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
  fun getPresentationResult(
    event: String,
    params: ReadableMap?,
    promise: Promise
  ) {
    CoroutineScope(Dispatchers.IO).launch {
      Superwall.instance.getPresentationResult(event, params?.toHashMap()).fold({
        launch(Dispatchers.Main) {
          promise.resolve(it.toJson())
        }
      },{
        promise.reject("Error", it.message)
      })
    }
  }

  @ReactMethod
  fun preloadPaywalls(eventNames: ReadableArray) {
    val eventNames = eventNames.toArrayList().toSet() as Set<String>
    Superwall.instance.preloadPaywalls(eventNames)
  }

  @ReactMethod
  fun preloadAllPaywalls(promise: Promise) {
    Superwall.instance.preloadAllPaywalls()
    promise.resolve(null)
  }
}

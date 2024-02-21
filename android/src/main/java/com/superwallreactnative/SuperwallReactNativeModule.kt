package com.superwallreactnative

import android.os.Debug
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.superwall.sdk.Superwall
import com.superwall.sdk.identity.identify
import com.superwall.sdk.misc.ActivityProvider
import com.superwall.sdk.paywall.presentation.PaywallPresentationHandler
import com.superwall.sdk.paywall.presentation.register
import com.superwallreactnative.bridges.SuperwallDelegateBridge
import com.superwallreactnative.models.IdentityOptions
import com.superwallreactnative.models.PaywallSkippedReason
import com.superwallreactnative.models.PurchaseResult
import com.superwallreactnative.models.RestorationResult
import com.superwallreactnative.models.SubscriptionStatus
import com.superwallreactnative.models.SuperwallOptions
import com.superwallreactnative.models.toJson

class SuperwallReactNativeModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  private val purchaseController = PurchaseControllerBridge(reactContext)
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

    Superwall.instance.setPlatformWrapper("React Native");
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
  fun setSubscriptionStatus(status: String) {
    val subscriptionStatus = SubscriptionStatus.fromString(status)
    Superwall.instance.setSubscriptionStatus(subscriptionStatus)
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
}

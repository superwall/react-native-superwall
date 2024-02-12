package com.superwallreactnative

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.Superwall
import com.superwall.sdk.config.options.SuperwallOptions
import com.superwall.sdk.misc.ActivityProvider

class SuperwallReactNativeModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Superwall"
  }

  @ReactMethod
  fun configure(
    apiKey: String,
    purchaseController: ReadableMap? = null,
    options: ReadableMap? = null,
    activityProvider: ActivityProvider? = null,
    completion: (() -> Unit)? = null
  ) {
    val purchaseController = PurchaseController.fromJson()
    val purchaseControllerBridge = purchaseController?.let {
      PurchaseControllerBridge(it)
    }
    val options = options?.let {
      SuperwallOptions.fromJson(options.toJson())
    }

    Superwall.configure(
      applicationContext = reactContext,
      apiKey = apiKey,
      purchaseController = purchaseControllerBridge,
      options = options,
      activityProvider = activityProvider,
      completion = completion
    )

    Superwall.instance.setPlatformWrapper("React Native");
  }
}

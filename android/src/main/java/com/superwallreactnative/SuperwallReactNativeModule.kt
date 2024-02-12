package com.superwallreactnative

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.Superwall
import com.superwall.sdk.config.options.SuperwallOptions
import com.superwall.sdk.delegate.subscription_controller.PurchaseController
import com.superwall.sdk.misc.ActivityProvider


class PurchaseControllerBridge(nativeModule: SuperwallReactNativeModule): PurchaseController {



  // Implement the PurchaseController interface
  override suspend fun purchase(
    activity: Activity,
    productDetails: ProductDetails,
    basePlanId: String?,
    offerId: String?
  ): PurchaseResult {


  }

  override suspend fun restorePurchases(): RestorationResult {

  }
}

class SuperwallReactNativeModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String {
    return "Superwall"
  }


  var purchasePromise?: CompletableFuture<PurchaseResult> = null  
  fun purchaseFromGooglePlayInRN(
    productId: String,
    basePlanId: String?,
    offerId: String?
  ): CompletableFuture<PurchaseResult> {
    purchasePromise = CompletableFuture<PurchaseResult>()

    // Emit event to JS

    return promise

  }

  fun purchaseResult (result: PurchaseResult) {
    purchasePromise?.complete(result)
  }


  @ReactMethod
  fun configure(
    apiKey: String,
    options: ReadableMap? = null
    usingPurchaseController: Bool? = null
  ) {
    val options = options?.let {
      SuperwallOptions.fromJson(options.toJson())
    }

    if (usingPurchaseController) {
      val purchaseController = PurchaseControllerBridge(this)
      Superwall.configure(
        applicationContext = reactContext,
        apiKey = apiKey,
        options = options,
        purchaseController = purchaseController
      )

    } else  {
      Superwall.configure(
        applicationContext = reactContext,
        apiKey = apiKey,
        options = options
      )
    }

    Superwall.instance.setPlatformWrapper("React Native");
  }


  // @ReactMethod
  // fun configure(
  //   apiKey: String,
  //   // purchaseController: ReadableMap? = null,
  //   options: ReadableMap? = null,
  //   // activityProvider: ActivityProvider? = null,
  //   // completion: (() -> Unit)? = null
  // ) {
  //   val purchaseController = PurchaseController.fromJson()
  //   val purchaseControllerBridge = purchaseController?.let {
  //     PurchaseControllerBridge(it)
  //   }
  //   val options = options?.let {
  //     SuperwallOptions.fromJson(options.toJson())
  //   }

  //   Superwall.configure(
  //     applicationContext = reactContext,
  //     apiKey = apiKey,
  //     purchaseController = purchaseControllerBridge,
  //     options = options,
  //     activityProvider = activityProvider,
  //     completion = completion
  //   )

  //   Superwall.instance.setPlatformWrapper("React Native");
  // }
}

package com.superwallreactnative

import android.app.Activity
import com.facebook.react.bridge.*
import com.superwall.sdk.delegate.PurchaseResult
import com.android.billingclient.api.ProductDetails
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.superwall.sdk.delegate.RestorationResult
import com.superwall.sdk.delegate.subscription_controller.PurchaseController
import kotlinx.coroutines.future.await
import java.util.concurrent.CompletableFuture

class PurchaseControllerBridge(
  var reactContext: ReactContext
): PurchaseController {
  var purchasePromise: CompletableFuture<PurchaseResult>? = null
  var restorePromise: CompletableFuture<RestorationResult>? = null

  override suspend fun purchase(
    activity: Activity,
    productDetails: ProductDetails,
    basePlanId: String?,
    offerId: String?
  ): PurchaseResult {
    purchasePromise = CompletableFuture()

    val productData = Arguments.createMap().apply {
      putString("productId", productDetails.productId) // Implement this method
      putString("basePlanId", basePlanId)
      putString("offerId", offerId)
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("purchaseFromGooglePlay", productData)

    return purchasePromise!!.await()
  }

  override suspend fun restorePurchases(): RestorationResult {
    restorePromise = CompletableFuture()

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("restore", null)

    return restorePromise!!.await()
  }
}

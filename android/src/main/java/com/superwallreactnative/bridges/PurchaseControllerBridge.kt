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
  private val purchaseController: PurchaseController
) : PurchaseController {

  // Implement the PurchaseController interface
  override suspend fun purchase(
    activity: Activity,
    productDetails: ProductDetails,
    basePlanId: String?,
    offerId: String?
  ): PurchaseResult {
    return purchaseController.purchaseFromGooglePlay(
      productId = productDetails.productId,
      basePlanId = basePlanId,
      offerId = offerId
    )
  }

  override suspend fun restorePurchases(): RestorationResult {
    return purchaseController.restorePurchases()
  }
}

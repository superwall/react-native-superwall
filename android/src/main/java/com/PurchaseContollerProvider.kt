package com.superwallreactnative

import android.content.Context
import com.superwall.sdk.delegate.subscription_controller.PurchaseController

object PurchaseControllerProvider {
  private var instance: PurchaseControllerBridge? = null

  fun getInstance(context: Context): PurchaseControllerBridge {
    if (instance == null) {
      instance = PurchaseControllerBridge(context as ReactContext)
    }
    return instance!!
  }
}
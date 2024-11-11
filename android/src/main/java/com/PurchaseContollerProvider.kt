package com.superwallreactnative

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.superwall.sdk.delegate.subscription_controller.PurchaseController

object PurchaseControllerProvider {
  private var instance: PurchaseControllerBridge? = null

  fun getInstance(context: ReactApplicationContext): PurchaseControllerBridge {
    if (instance == null) {
      instance = PurchaseControllerBridge(context)
    } else {
      instance?.reactContext = context
    }
    return instance!!
  }
}

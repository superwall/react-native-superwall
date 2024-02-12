package com.superwallreactnative

import com.facebook.react.bridge.*

class PurchaseControllerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "PurchaseController"
  }

  @ReactMethod
  fun initialize(purchaseControllerId: String, promise: Promise) {
    try {
      val purchaseController = PurchaseController(purchaseControllerId)
      // Do additional setup if needed

      // Store the purchaseController instance in a map if you need to reference it later
      // myControllersMap[purchaseControllerId] = purchaseController

      promise.resolve(null)
    } catch (e: Exception) {
      promise.reject(e)
    }
  }

  // Add additional methods to manipulate PurchaseController instances if needed
}

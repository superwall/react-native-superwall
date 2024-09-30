package com.superwallreactnative.bridges

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.superwall.sdk.analytics.superwall.SuperwallEventInfo
import com.superwall.sdk.delegate.SubscriptionStatus
import com.superwall.sdk.delegate.SuperwallDelegate
import com.superwall.sdk.paywall.presentation.PaywallInfo
import com.superwallreactnative.models.SuperwallEvent
import com.superwallreactnative.models.convertMapToReadableMap
import com.superwallreactnative.models.toJson
import java.net.URL
import android.net.Uri

class SuperwallDelegateBridge(
  private val reactContext: ReactContext
): SuperwallDelegate {
  override fun subscriptionStatusDidChange(to: SubscriptionStatus) {
    val data = Arguments.createMap().apply {
      putString("subscriptionStatus", to.toString())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("subscriptionStatusDidChange", data)
  }

  override fun handleSuperwallEvent(eventInfo: SuperwallEventInfo) {
    val data = Arguments.createMap().apply {
      putMap("eventInfo", eventInfo.toJson())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("handleSuperwallEvent", data)
  }

  override fun handleCustomPaywallAction(withName: String) {
    val data = Arguments.createMap().apply {
      putString("name", withName)
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("handleCustomPaywallAction", data)
  }

  override fun willDismissPaywall(withInfo: PaywallInfo) {
    val data = Arguments.createMap().apply {
      putMap("info", withInfo.toJson())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("willDismissPaywall", data)
  }

  override fun willPresentPaywall(withInfo: PaywallInfo) {
    val data = Arguments.createMap().apply {
      putMap("info", withInfo.toJson())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("willPresentPaywall", data)
  }

  override fun didDismissPaywall(withInfo: PaywallInfo) {
    val data = Arguments.createMap().apply {
      putMap("info", withInfo.toJson())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("didDismissPaywall", data)
  }

  override fun didPresentPaywall(withInfo: PaywallInfo) {
    val data = Arguments.createMap().apply {
      putMap("info", withInfo.toJson())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("didPresentPaywall", data)
  }

  override fun paywallWillOpenURL(url: URL) {
    val data = Arguments.createMap().apply {
      putString("url", url.toString())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("paywallWillOpenURL", data)
  }

  override fun paywallWillOpenDeepLink(url: Uri) {
    val data = Arguments.createMap().apply {
      putString("url", url.toString())
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("paywallWillOpenDeepLink", data)
  }

  override fun handleLog(
    level: String,
    scope: String,
    message: String?,
    info: Map<String, Any>?,
    error: Throwable?
  ) {
    val data = Arguments.createMap().apply {
      putString("level", level)
      putString("scope", scope)
      putString("message", message)
      putMap("info", info?.let { convertMapToReadableMap(it) })
      putString("error", error?.message)
    }

    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("handleLog", data)
  }
}

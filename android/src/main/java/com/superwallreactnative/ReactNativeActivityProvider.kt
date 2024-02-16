package com.superwallreactnative

import android.app.Activity
import com.facebook.react.bridge.ReactApplicationContext
import com.superwall.sdk.misc.ActivityProvider

class ReactNativeActivityProvider(private val reactContext: ReactApplicationContext) : ActivityProvider {

  override fun getCurrentActivity(): Activity? {
    // Utilizes ReactContext to get the current activity
    return reactContext.currentActivity
  }
}

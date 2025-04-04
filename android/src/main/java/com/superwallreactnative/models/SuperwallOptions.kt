package com.superwallreactnative.models

import com.facebook.react.bridge.ReadableMap
import com.superwall.sdk.config.options.PaywallOptions
import com.superwall.sdk.config.options.SuperwallOptions
import com.superwall.sdk.logger.LogLevel
import com.superwall.sdk.logger.LogScope
import java.util.EnumSet

class SuperwallOptions {
  companion object {
    fun fromJson(json: ReadableMap): SuperwallOptions {
      val options = SuperwallOptions()
      options.localeIdentifier = json.getString("localeIdentifier")
      options.isExternalDataCollectionEnabled = json.getBoolean("isExternalDataCollectionEnabled")
      options.isGameControllerEnabled = json.getBoolean("isGameControllerEnabled")
      options.passIdentifiersToPlayStore = json.getBoolean("passIdentifiersToPlayStore")

      val networkEnvironment = when (json.getString("networkEnvironment")) {
        "release" -> SuperwallOptions.NetworkEnvironment.Release()
        "releaseCandidate" -> SuperwallOptions.NetworkEnvironment.ReleaseCandidate()
        "developer" -> SuperwallOptions.NetworkEnvironment.Developer()
        else -> options.networkEnvironment
      }
      options.networkEnvironment = networkEnvironment

      // Logging
      val loggingMap = json.getMap("logging")
      val scopesArray = loggingMap?.getArray("scopes")
      val scopes = EnumSet.noneOf(LogScope::class.java)

      if (scopesArray != null) {
        for (i in 0 until scopesArray.size()) {
          val scopeStr = scopesArray.getString(i)
          if (scopeStr != null) {
            try {
              scopes.add(enumValueOf<LogScope>(scopeStr))
            } catch (e: IllegalArgumentException) {}
          }
        }
      }

      val levelStr = loggingMap?.getString("level")
      val level = LogLevel.values().find { it.toString().equals(levelStr, ignoreCase = true) }
        ?: LogLevel.warn

      val logging = SuperwallOptions.Logging()
      logging.scopes = scopes
      logging.level = level
      options.logging = logging

      // PaywallOptions
      val paywallsMap = json.getMap("paywalls")
      val isHapticFeedbackEnabled = paywallsMap?.getBoolean("isHapticFeedbackEnabled")
      val shouldShowPurchaseFailureAlert = paywallsMap?.getBoolean("shouldShowPurchaseFailureAlert")
      val shouldPreload = paywallsMap?.getBoolean("shouldPreload")
      val automaticallyDismiss = paywallsMap?.getBoolean("automaticallyDismiss")

      val paywalls = PaywallOptions()
      paywalls.isHapticFeedbackEnabled = isHapticFeedbackEnabled ?: paywalls.isHapticFeedbackEnabled
      paywalls.shouldShowPurchaseFailureAlert = shouldShowPurchaseFailureAlert ?: paywalls.shouldShowPurchaseFailureAlert
      paywalls.shouldPreload = shouldPreload ?: paywalls.shouldPreload
      paywalls.automaticallyDismiss = automaticallyDismiss ?: paywalls.automaticallyDismiss

      val restoreFailedMap = paywallsMap?.getMap("restoreFailed")
      val restoreFailed = PaywallOptions.RestoreFailed().apply {
        restoreFailedMap?.let {
          title = it.getString("title") ?: title // Keep default if not found
          message = it.getString("message") ?: message // Keep default if not found
          closeButtonTitle = it.getString("closeButtonTitle") ?: closeButtonTitle // Keep default if not found
        }
      }
      paywalls.restoreFailed = restoreFailed

      val transactionBackgroundViewStr = paywallsMap?.getString("transactionBackgroundView") ?: paywalls.transactionBackgroundView
      paywalls.transactionBackgroundView = when (transactionBackgroundViewStr) {
        "spinner" -> PaywallOptions.TransactionBackgroundView.SPINNER
        else -> null
      }

      options.paywalls = paywalls

      return options
    }
  }
}

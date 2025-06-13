# CHANGELOG

The changelog for `Superwall`. Also see the [releases](https://github.com/superwall/react-native-superwall/releases) on GitHub.

## 2.1.5

### Enhancements

- Exposes the `enableExperimentalDeviceVariables` `SuperwallOption`.

## 2.1.4

### Enhancements

- Upgrades iOS SDK to 4.4.1 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.4.1).
- Upgrades Android SDK to 2.1.2 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.1.2).

## 2.1.3

### Fixes

- Fixes issue when building for iOS.

## 2.1.2

### Fixes

- Upgrades iOS SDK to 4.4.0 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.4.0).

## 2.1.1

### Enhancements

- Upgrades Android SDK to 2.1.0 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.1.0).

## 2.1.0

### Fixes

- Upgrades iOS SDK to 4.3.9 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.3.9).

### Enhancements
- Adds support for `storeKitVersion` in `SuperwallOptions`.
- Fixes an issue preventing `SuperwallDelegate.didRedeemLink` from getting
  called when a Web Checkout link was redeemed.
- Adds `didRedeem` and `willRedeem` to support web checkout

## 2.1.0 (Beta 3)

### Fixes

- Adds support for `storeKitVersion` in `SuperwallOptions`.

## 2.1.0 (Beta 2)

### Fixes

- Fixes an issue preventing `SuperwallDelegate.didRedeemLink` from getting called when a Web Checkout link was redeemed.

## 2.1.0 (Beta 1)

### Enhancements

- Adds `didRedeem` and `willRedeem` to support web checkout
- Upgrades iOS SDK to 4.3.7 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.3.7).


## 2.0.14

### Enhancements

- Upgrades iOS SDK to 4.3.5 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.3.5).


## 2.0.13

### Enhancements

- Adds `getAssignments`.
- Upgrades iOS SDK to 4.3.0 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.3.0).

## 2.0.12

### Enhancements

- Adds `setLogLevel`.
- Upgrades Android SDK to 2.0.6 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.0.6).

### Fixes

- Bug fixes for running the example app on Xcode 16.4.

## 2.0.11

### Enhancements

- Upgrades iOS SDK to 4.2.0 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.2.0).

### Fixes

- Fixes an issue preventing `RestorationResult.failed` from deserializing, which caused failed Restore Purchases attempts to get stuck with the loading indicator shown.

## 2.0.10

### Enhancements

- Upgrades iOS SDK to 4.0.6 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.0.6).

### Fixes

- Fixes `productId` not being available in the `PurchaseResult` on iOS.
- Fixes issues for Kotlin 2.0 users on Android

## 2.0.9

### Fixes

- Fixes issue with `getSubscriptionStatus` on iOS.

## 2.0.8

### Enhancements

- Upgrades Android SDK to 2.0.5 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.0.5).
- Upgrades iOS SDK to 4.0.5 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.0.5).
- Adds back `getSubscriptonStatus`

## 2.0.7

## Fixes

- Fixes issue when hanling deep links

## 2.0.6

### Enhancements

- Upgrades Android SDK to 2.0.3 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.0.3).
- Upgrades Android SDK to 4.0.3 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.0.3).
- Updates `SuperwallPlacement` naming to `SuperwallEvent`

## 2.0.5

### Enhancements

- Upgrades Android SDK to 2.0.2 [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/2.0.2).

## 2.0.4

### Enhancements

- Upgrades iOS SDK to 4.0.1 [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/4.0.1).

## 2.0.3

### Enhancements

- Updates `SubscriptionStatus.Active` to accept either a list of strings or a list of `Entitlement` objects.
- Updates how feature block is passed in and used in `register` call
- Removes the need for params to be a `Map`, the parameter now supports a `Record`
- Upgrades Android SDK to `2.0.1` [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/2.0.1)

### Fixes

- Example project fixes.

## 2.0.2

### Fixes

- Readds `handleDeepLink(url:)` to `Superwall`.

## 2.0.1

### Fixes

- Fixes the issue `TypeError: SuperwallReactNative.observeSubscriptionStatus is not a function`.

## 2.0.0

### Breaking Changes

- Updated API for `Superwall.shared.configure` to now receive an object
- Updated API for `Superwall.shared.register` to now receive an object
- Updated API for `Superwall.shared.setSubscriptionStatus` to now receive a `SubscriptionStatus` type with an `Entitlements` array in case of `SubscriptionStatus.Active`
- Added a `subscriptionStatusEmitter` you can subscribe to using the `change`listener
- Upgrades iOS SDK to 4.0.0 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/4.0.0).
- Upgrades Android SDK to 2.0.0 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/2.0.0)
- View more changes in our [migration guide](https://superwall.com/docs/migrating-to-v2-react-native)

## 1.4.7

### Enhancements

- Upgrades iOS SDK to 3.12.4 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.12.4).

## 1.4.6

### Enhancements

- Upgrades iOS SDK to 3.12.3 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.12.3).

## 1.4.5

### Fixes

- Removes unnecessary date comparison from PurchaseController example code.
- Adds a StoreKit configuration file to the iOS expo example app.

## 1.4.4

### Enhancements

- Upgrades iOS SDK to 3.12.1 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.12.1)

## 1.4.3

### Enhancements

- Upgrades Android SDK to 1.5.1 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.5.1)
- Upgrades iOS SDK to 3.12.0 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.12.0)

### Fixes

- Fixes issue where accessing configuration state before configuring would cause a crash.

## 1.4.2

### Fixes

- Fixes an issue where params that were passed with `getPresentationResult(event:params:)` were being dropped.

## 1.4.1

### Enhancements

- Exposes `getPresentationResult(event:params:)`. This returns a `PresentationResult`, which preemptively gets the result of registering an event. This helps you determine whether a particular event will present a paywall in the future.

## 1.4.0

### Enhancements

- Adds `setInterfaceStyle(style:)` to Superwall, which you can use to set the interface style as `LIGHT` or `DARK`.

## 1.3.5

### Fixes

- Fixes issue where the `PurchaseController` functions wouldn't get called on hot restart of the app.
- Fixes issue with configuration status serialization on Android.
- Fixes issue with preloading paywalls on Android.

## 1.3.4

### Enhancements

- Upgrades Android SDK to 1.3.1 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.3.1)
- Upgrades iOS SDK to 3.11.1 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.11.1)
- Adds `preloadAllPaywalls` and `preloadPaywalls(eventNames: Set<String>)` method to `Superwall` which preloads all paywalls or paywalls for the event names passed in the argument.

### Fixes

- Fixes issue with the `Experiment` inside `PaywallInfo` being `null` in the `handleSuperwallEvent` delegate for iOS.

## 1.3.3

### Enhancements

- Upgrades Android SDK to 1.3.0 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.3.0)
- Upgrades iOS SDK to 3.10.1 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.10.1)
- Adds `passIdentifiersToPlayStore` to `SuperwallOptions` which allows you to pass user identifiers to the Play Store purchases as account identifiers. This is useful for tracking user purchases in the Play Store console.
- Adds `confirmAllAssignments` method to `Superwall` which confirms assignments for all placements and returns an array of all confirmed experiment assignments. Note that the assignments may be different when a placement is registered due to changes in user, placement, or device parameters used in audience filters.

### Fixes

- Fixes issue with the `Experiment` inside `PaywallInfo` being `null` in the `handleSuperwallEvent` delegate for iOS.

## 1.3.2

### Enhancements

- Upgrades iOS SDK to 3.10.0 [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.10.0)
- Upgrades Android SDK to 1.2.9 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.2.9)

## 1.3.1

### Enhancements

- Upgrades Android SDK to 1.2.8 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.2.8)

## 1.3.0

### Enhancements

- Upgrades iOS SDK to 3.9.1. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.9.1)
- Upgrades Android SDK to 1.2.7 [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.2.7)
- Exposes the `SuperwallOption` `collectAdServicesAttribution` for iOS. When `true`, this collects the AdServices attribute token, which will be process by our backend. This adds `adServicesTokenRequest_start`, `adServicesTokenRequest_complete`, and `adServicesTokenRequest_fail` events.
- Exposes `getConfigurationStatus()`. This returns either `PENDING`, `CONFIGURED`, or `FAILED`.

## 1.2.7

### Fixes

// TODO: Update iOS to latest version before releasing.

- Fixes issue where the `paywallWillOpenURL` wasn't being called.

## 1.2.6

### Enhancements

- Adds an expo example project.
- Upgrades iOS SDK to 3.7.3. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.7.3)
- Upgrades Android SDK to 1.2.4. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.2.4)

## 1.2.5

### Fixes

- Fixes `Switch must be exhaustive` error caused by the upgrade of the iOS SDK.

## 1.2.4

### Enhancements

- Upgrades iOS SDK to 3.7.0. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.7.0)

### Fixes

- Fixes an error `Invalid LocalNotificationType value`.

## 1.2.3

### Enhancements

- Adds `Superwall.shared.dismiss()` to be able to dismiss a paywall programmatically.
- Upgrades Android SDK to 1.2.1. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.2.1)

## 1.2.2

### Enhancements

- Upgrades iOS SDK to 3.6.6. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.6.6)
- Upgrades Android SDK to 1.1.7. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.7)

### Fixes

- Makes sure the iOS SDK is pinned to a specific version, rather than a minimum version.

## 1.2.1

### Enhancements

- Upgrades Android SDK to 1.1.6. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.6)

## 1.2.0

### Enhancements

- Adds `handleDeepLink(url:)`.
- Adds `setUserAttributes(userAttributes:)` and `getUserAttributes()`.
- Upgrades iOS SDK to 3.6.5. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.6.5)

### Fixes

- Transaction error alerts now display the intended error message rather than a generic `PurchaseResultError`.

## 1.1.3

### Enhancements

- Upgrades Android SDK to 1.1.5. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.5)

## 1.1.2

### Enhancements

- Upgrades Android SDK to 1.1.4. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.4)
- Upgrades iOS SDK to 3.6.2. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.6.2)

### Fixes

- Fixes issue where the React Native `SuperwallEvent` hadn't been updated to include `identityAlias`.

## 1.1.1

### Enhancements

- Upgrades Android SDK to 1.1.2. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.2)
- Upgrades iOS SDK to 3.6.1. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.6.1)

## 1.1.0

### Enhancements

- Upgrades Android SDK to 1.1.1. [View Android SDK release notes](https://github.com/superwall-me/Superwall-Android/releases/tag/1.1.1)
- Upgrades iOS SDK to 3.6.0. [View iOS SDK release notes](https://github.com/superwall-me/Superwall-iOS/releases/tag/3.6.0)

### Fixes

- Fixes issue with restoration on iOS.
- Fixes issue with presenting surveys.

## 1.0.5

### Fixes

- Fixes issue where params sent via register were being dropped.

## 1.0.4

### Enhancements

- Upgrades Android SDK to 1.0.2. [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/1.0.2)

## 1.0.3

### Fixes

- Providing your own `PurchaseController` now works as expected.
- Publicly exposes `EventType`, `PurchaseResultCancelled`, `PurchaseResultFailed`, `PurchaseResultPending`, `PurchaseResultPurchased`, `PurchaseResultRestored`, `TransactionBackgroundView`.

## 1.0.2

### Enhancements

- Upgrades Android SDK to 1.0.0. [View Android SDK release notes](https://github.com/superwall/Superwall-Android/releases/tag/1.0.0)
- Upgrades iOS SDK to 3.5.0. [View iOS SDK release notes](https://github.com/superwall/Superwall-iOS/releases/tag/3.5.0)

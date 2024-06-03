# CHANGELOG

The changelog for `Superwall`. Also see the [releases](https://github.com/superwall/react-native-superwall/releases) on GitHub.

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

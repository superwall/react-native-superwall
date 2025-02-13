import { NativeModules, Platform } from 'react-native';
import { PurchaseController } from './public/PurchaseController';
import { SuperwallOptions } from './public/SuperwallOptions';
import { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
import { PaywallInfo } from './public/PaywallInfo';
import { PaywallSkippedReason } from './public/PaywallSkippedReason';
import { SubscriptionStatus } from './public/SubscriptionStatus';
import { InterfaceStyle } from './public/InterfaceStyle';
import { SuperwallDelegate } from './public/SuperwallDelegate';
import { SuperwallPlacementInfo } from './public/SuperwallPlacementInfo';
import { NativeEventEmitter } from 'react-native';
import { IdentityOptions } from './public/IdentityOptions';
import { EventEmitter } from 'events';
import { ConfigurationStatus } from './public/ConfigurationStatus';
import { ConfirmedAssignment } from './public/ConfirmedAssigments';
import type { PresentationResult } from './public/PresentationResult';
import { EntitlementsInfo } from './public/EntitlementsInfo';
const { version } = require('../package.json');

const LINKING_ERROR =
  `The package 'superwall-react-native' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SuperwallReactNative = NativeModules.SuperwallReactNative
  ? NativeModules.SuperwallReactNative
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export { ComputedPropertyRequest } from './public/ComputedPropertyRequest';
export { Experiment } from './public/Experiment';
export { FeatureGatingBehavior } from './public/FeatureGatingBehavior';
export { IdentityOptions } from './public/IdentityOptions';
export { LocalNotification } from './public/LocalNotification';
export { LogLevel } from './public/LogLevel';
export { LogScope } from './public/LogScope';
export { PaywallCloseReason } from './public/PaywallCloseReason';
export { PaywallInfo } from './public/PaywallInfo';
export { Product } from './public/Product';
export { PurchaseController } from './public/PurchaseController';
export { SubscriptionStatus } from './public/SubscriptionStatus';
export { PurchaseResult } from './public/PurchaseResult';
export {
  PurchaseResultPurchased,
  PurchaseResultPending,
  PurchaseResultCancelled,
  PurchaseResultFailed,
  PurchaseResultRestored,
} from './public/PurchaseResult';
export { RestorationResult } from './public/RestorationResult';
export { InterfaceStyle } from './public/InterfaceStyle';
export { ConfigurationStatus } from './public/ConfigurationStatus';
//export { Superwall } from './Superwall';
export { SuperwallDelegate } from './public/SuperwallDelegate';
export {
  SuperwallPlacementInfo,
  PlacementType,
} from './public/SuperwallPlacementInfo';
export { SuperwallOptions } from './public/SuperwallOptions';
export { Survey } from './public/Survey';
export { TriggerResult } from './public/TriggerResult';
export {
  PaywallOptions,
  TransactionBackgroundView,
} from './public/PaywallOptions';
export { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
export { PaywallPresentationRequestStatus } from './public/PaywallPresentationRequestStatus';
export {
  PaywallSkippedReason,
  PaywallSkippedReasonPlacementNotFound,
  PaywallSkippedReasonHoldout,
  PaywallSkippedReasonNoAudienceMatch,
  PaywallSkippedReasonUserIsSubscribed,
} from './public/PaywallSkippedReason';
export { RestoreType } from './public/RestoreType';
export {
  useSuperwall,
  useSubscriptionStatus,
  useEntitlements,
  useRegister,
} from './hooks/hooks';

interface UserAttributes {
  [key: string]: any;
}

export default class Superwall {
  static purchaseController?: PurchaseController;
  private static delegate?: SuperwallDelegate;
  private static _superwall = new Superwall();
  private eventEmitter = new NativeEventEmitter(SuperwallReactNative);
  private static configEmitter = new EventEmitter();
  private static didConfigure = false;
  private presentationHandlers: Map<string, PaywallPresentationHandler> =
    new Map();
  subscriptionStatusEmitter = new EventEmitter();

  private static setDidConfigure(didConfigure: boolean) {
    this.didConfigure = didConfigure;
    // Emit an event when the bridged state is true
    if (didConfigure) {
      this.configEmitter.emit('configured', didConfigure);
    }
  }

  private async awaitConfig(): Promise<void> {
    if (Superwall.didConfigure) {
      return;
    }

    await new Promise<void>((resolve) => {
      Superwall.configEmitter.once('configured', () => {
        resolve();
      });
    });
  }

  private constructor() {
    this.eventEmitter.addListener('purchaseFromAppStore', async (data) => {
      var purchaseResult =
        await Superwall.purchaseController?.purchaseFromAppStore(
          data.productId
        );
      if (purchaseResult == null) {
        return;
      }
      await SuperwallReactNative.didPurchase(purchaseResult.toJSON());
    });

    this.eventEmitter.addListener(
      'purchaseFromGooglePlay',
      async (productData) => {
        var purchaseResult =
          await Superwall.purchaseController?.purchaseFromGooglePlay(
            productData.productId,
            productData.basePlanId,
            productData.offerId
          );
        if (purchaseResult == null) {
          return;
        }
        await SuperwallReactNative.didPurchase(purchaseResult.toJSON());
      }
    );

    this.eventEmitter.addListener('restore', async () => {
      var restorationResult =
        await Superwall.purchaseController?.restorePurchases();
      if (restorationResult == null) {
        return;
      }
      await SuperwallReactNative.didRestore(restorationResult.toJson());
    });

    this.eventEmitter.addListener('paywallPresentationHandler', (data) => {
      var handler = this.presentationHandlers.get(data.handlerId);
      if (!handler) {
        return;
      }
      switch (data.method) {
        case 'onPresent':
          if (handler.onPresentHandler) {
            const paywallInfo = PaywallInfo.fromJson(data.paywallInfoJson);
            handler.onPresentHandler(paywallInfo);
          }
          break;
        case 'onDismiss':
          if (handler.onDismissHandler) {
            const paywallInfo = PaywallInfo.fromJson(data.paywallInfoJson);
            handler.onDismissHandler(paywallInfo);
          }
          break;
        case 'onError':
          if (handler.onErrorHandler) {
            handler.onErrorHandler(data.errorString);
          }
          break;
        case 'onSkip':
          if (handler.onSkipHandler) {
            const skippedReason = PaywallSkippedReason.fromJson(
              data.skippedReason
            );
            handler.onSkipHandler(skippedReason);
          }
          break;
      }
    });

    // MARK: - SuperwallDelegate Listeners
    this.eventEmitter.addListener(
      'subscriptionStatusDidChange',
      async (data) => {
        const from = SubscriptionStatus.fromString(
          data.from,
          data.entitlements
        );
        const to = SubscriptionStatus.fromString(data.to, data.entitlements);
        Superwall.delegate?.subscriptionStatusDidChange(from, to);
      }
    );

    this.eventEmitter.addListener('handleSuperwallPlacement', async (data) => {
      const placementInfo = SuperwallPlacementInfo.fromJson(data.placementInfo);
      Superwall.delegate?.handleSuperwallPlacement(placementInfo);
    });

    this.eventEmitter.addListener('handleCustomPaywallAction', async (data) => {
      const name = data.name;
      Superwall.delegate?.handleCustomPaywallAction(name);
    });

    this.eventEmitter.addListener('willDismissPaywall', async (data) => {
      const info = PaywallInfo.fromJson(data.info);
      Superwall.delegate?.willDismissPaywall(info);
    });

    this.eventEmitter.addListener('willPresentPaywall', async (data) => {
      const info = PaywallInfo.fromJson(data.info);
      Superwall.delegate?.willPresentPaywall(info);
    });

    this.eventEmitter.addListener('didDismissPaywall', async (data) => {
      const info = PaywallInfo.fromJson(data.info);
      Superwall.delegate?.didDismissPaywall(info);
    });

    this.eventEmitter.addListener('didPresentPaywall', async (data) => {
      const info = PaywallInfo.fromJson(data.info);
      Superwall.delegate?.didPresentPaywall(info);
    });

    this.eventEmitter.addListener('handleLog', async (data) => {
      Superwall.delegate?.handleLog(
        data.level,
        data.scope,
        data.message,
        data.info,
        data.error
      );
    });

    this.eventEmitter.addListener('paywallWillOpenDeepLink', async (data) => {
      const url = new URL(data.url);
      Superwall.delegate?.paywallWillOpenDeepLink(url);
    });

    this.eventEmitter.addListener('paywallWillOpenURL', async (data) => {
      const url = new URL(data.url);
      Superwall.delegate?.paywallWillOpenURL(url);
    });
  }

  private async observeSubscriptionStatus() {
    await SuperwallReactNative.observeSubscriptionStatus();
    this.eventEmitter.addListener('subscriptionStatusChanged', async (data) => {
      const status = SubscriptionStatus.fromJson(data);
      this.subscriptionStatusEmitter.emit('change', status);
    });
  }
  /**
   * Returns the configured shared instance of `Superwall`.
   *
   * **Warning:** You must call {@link Superwall.configure} to initialize `Superwall`
   * before accessing this shared instance.
   *
   * @returns {Superwall} The shared `Superwall` instance.
   */
  static get shared(): Superwall {
    return this._superwall;
  }

  /**
   * Configures a shared instance of `Superwall` for use throughout your app.
   *
   * Call this as soon as your app starts to initialize the Superwall SDK.
   * Check out [Configuring the SDK](https://docs.superwall.com/docs/configuring-the-sdk) for information about how to configure the SDK.
   *
   * @param {object} config - Configuration object.
   * @param {string} config.apiKey - Your Public API Key that you can get from the Superwall dashboard settings.
   *   If you don't have an account, you can [sign up for free](https://superwall.com/sign-up).
   * @param {SuperwallOptions} [config.options] - An optional object which allows you to customize the appearance and behavior
   *   of the paywall.
   * @param {PurchaseController} [config.purchaseController] - An optional object that conforms to `PurchaseController`.
   *   Implement this if you'd like to handle all subscription-related logic yourself. You'll need to also set the `subscriptionStatus`
   *   every time the user's entitlements change. You can read more about that in [Purchases and Subscription Status](https://docs.superwall.com/docs/advanced-configuration).
   *   If omitted, Superwall will handle all subscription-related logic itself.
   * @param {() => void} [config.completion] - An optional completion handler that lets you know when Superwall has finished configuring.
   *
   * @returns {Promise<Superwall>} The configured `Superwall` instance.
   */
  static async configure({
    apiKey,
    options,
    purchaseController,
    completion,
  }: {
    apiKey: string;
    options?: SuperwallOptions;
    purchaseController?: PurchaseController;
    completion?: () => void;
  }): Promise<Superwall> {
    this.purchaseController = purchaseController;
    Superwall.purchaseController = purchaseController;
    await SuperwallReactNative.configure(
      apiKey,
      options?.toJson(),
      !!purchaseController,
      version
    ).then(() => {
      if (completion) completion();
      Superwall.shared.observeSubscriptionStatus();
    });

    this.setDidConfigure(true);

    return this._superwall;
  }

  /**
   * Creates an account with Superwall by linking the provided `userId` to Superwall's automatically generated alias.
   *
   * Call this function as soon as you have a valid `userId`.
   *
   * @param {Object} config - The identification configuration object.
   * @param {string} config.userId - Your user's unique identifier as defined by your backend system.
   * @param {IdentityOptions} [config.options] - An optional {@link IdentityOptions} object. You can set the
   *   {@link IdentityOptions.restorePaywallAssignments} property to `true` to instruct the SDK to wait to restore paywall assignments
   *   from the server before presenting any paywalls. This option should be used only in advanced cases
   *   (e.g., when users frequently switch accounts or reinstall the app).
   *
   * @returns {Promise<void>} A promise that resolves once the identification process is complete.
   */
  async identify({
    userId,
    options,
  }: {
    userId: string;
    options?: IdentityOptions;
  }): Promise<void> {
    await this.awaitConfig();

    const serializedOptions = options ? options.toJson() : null;

    await SuperwallReactNative.identify(userId, serializedOptions);
  }

  /**
   * Resets the `userId`, on-device paywall assignments, and data stored by Superwall.
   *
   * @returns {Promise<void>} A promise that resolves once reset is complete.
   */
  async reset(): Promise<void> {
    await this.awaitConfig();
    await SuperwallReactNative.reset();
  }

  /**
   * Registers a placement to access a feature. When the placement is added to a campaign on the [Superwall Dashboard](https://superwall.com/dashboard),
   * it can trigger a paywall.
   *
   * The paywall will be presented when:
   *  - The provided placement is included in a campaign on the Superwall Dashboard;
   *  - The user matches an audience filter defined in the campaign; and
   *  - The user does not have an active subscription.
   *
   * Before using this method, you must create a campaign and add the placement to the campaign on the
   * [Superwall Dashboard](https://superwall.com/dashboard).
   *
   * The displayed paywall is determined by the audience filters set in the campaign.
   * Once a user is assigned a paywall within an audience, that paywall will continue to be shown unless
   * you remove it from the audience or reset the paywall assignments.
   *
   * @param {Object} options - The options for registering a placement.
   * @param {string} options.placement - The name of the placement you wish to register.
   * @param {Record<string, any>} [options.params] - Optional parameters to pass with your placement.
   *   These parameters can be referenced within the audience filters of your campaign. Keys beginning with `$`
   *   are reserved for Superwall and will be omitted. Values can be any JSON encodable value, URLs, or Dates.
   *   Arrays and dictionaries as values are not supported at this time and will be dropped.
   * @param {PaywallPresentationHandler} [options.handler] - An optional handler that receives status updates
   *   about the paywall presentation.
   * @param {() => void} options.feature - A callback function representing the feature you wish to paywall.
   *   This callback is remotely configurable via the [Superwall Dashboard](https://superwall.com/dashboard).
   *   - For _Non Gated_ paywalls, this is called when the paywall is dismissed or if the user is already paying.
   *   - For _Gated_ paywalls, this is called only if the user is already paying or if they begin paying.
   *   - If no paywall is configured, this callback is executed immediately.
   *   Note: This callback will not be invoked in the event of an error, which you can detect via the `handler`.
   *
   * @returns {Promise<void>} A promise that resolves once the placement registration process is complete.
   */
  async register({
    placement,
    params,
    handler,
    feature,
  }: {
    placement: string;
    params?: Map<String, any>;
    handler?: PaywallPresentationHandler;
    feature?: () => void;
  }): Promise<void> {
    await this.awaitConfig();
    let handlerId: string | null = null;

    if (handler) {
      const uuid = (+new Date() * Math.random()).toString(36);
      this.presentationHandlers.set(uuid, handler);
      handlerId = uuid;
    }

    let paramsObject = {};
    if (params) {
      paramsObject = Object.fromEntries(params);
    }

    await SuperwallReactNative.register(
      placement,
      paramsObject,
      handlerId
    ).then(() => {
      if (feature) feature();
    });
  }

  /**
   * Confirms all experiment assignments and returns them in an array.
   *
   * This method tracks the {@link SuperwallPlacement.confirmAllAssignments} event in the delegate.
   *
   * Note that the assignments may differ when a placement is registered due to changes
   * in user, placement, or device parameters used in audience filters.
   *
   * @returns {Promise<ConfirmedAssignment[]>} A promise that resolves to an array of {@link ConfirmedAssignment} objects.
   */
  async confirmAllAssignments(): Promise<ConfirmedAssignment[]> {
    await this.awaitConfig();
    const assignments = await SuperwallReactNative.confirmAllAssignments();
    return assignments.map((assignment: any) =>
      ConfirmedAssignment.fromJson(assignment)
    );
  }

  /**
   * Preemptively gets the result of registering a placement.
   *
   * This helps you determine whether a particular placement will present a paywall in the future.
   * Note that this method does not present a paywall. To present a paywall, use the `register` function.
   *
   * @param {Object} options - Options for obtaining the presentation result.
   * @param {string} options.placement - The name of the placement you want to register.
   * @param {Map<string, any>} [options.params] - Optional parameters to pass with your placement.
   *
   * @returns {Promise<PresentationResult>} A promise that resolves to a {@link PresentationResult} indicating the result of registering the placement.
   */
  async getPresentationResult({
    placement,
    params,
  }: {
    placement: string;
    params?: Map<string, any>;
  }): Promise<PresentationResult> {
    await this.awaitConfig();
    let paramsObject = {};
    if (params) {
      paramsObject = Object.fromEntries(params);
    }
    return await SuperwallReactNative.getPresentationResult(
      placement,
      paramsObject
    );
  }

  /**
   * Retrieves the current configuration status of the Superwall SDK.
   *
   * This function returns a promise that resolves to the current configuration status,
   * indicating whether the SDK has finished configuring. Initially, the status is
   * {@link ConfigurationStatus.PENDING}. Once the configuration completes successfully, it
   * changes to {@link ConfigurationStatus.CONFIGURED}. If the configuration fails, the status
   * will be {@link ConfigurationStatus.FAILED}.
   *
   * @returns {Promise<ConfigurationStatus>} A promise that resolves with the current configuration status.
   */
  async getConfigurationStatus(): Promise<ConfigurationStatus> {
    const configurationStatusString =
      await SuperwallReactNative.getConfigurationStatus();
    return ConfigurationStatus.fromString(configurationStatusString);
  }

  /**
   * Retrieves the entitlements tied to the device.
   *
   * @returns {Promise<EntitlementsInfo>} A promise that resolves to an {@link EntitlementsInfo} object.
   */
  async getEntitlements(): Promise<EntitlementsInfo> {
    await this.awaitConfig();
    const entitlementsJson = await SuperwallReactNative.getEntitlements();
    return EntitlementsInfo.fromObject(entitlementsJson);
  }

  /**
   * Sets the subscription status of the user.
   *
   * When using a PurchaseController, you must call this method to update the user's subscription status.
   * Alternatively, you can implement the {@link SuperwallDelegate.subscriptionStatusDidChange} delegate callback to receive notifications
   * whenever the subscription status changes.
   *
   * @param {SubscriptionStatus} status - The new subscription status.
   *
   * @returns {Promise<void>} A promise that resolves once the subscription status has been updated.
   */
  async setSubscriptionStatus(status: SubscriptionStatus): Promise<void> {
    await this.awaitConfig();
    await SuperwallReactNative.setSubscriptionStatus(status);
  }

  /**
   * Sets the user interface style, which overrides the system setting.
   *
   * Provide a value of type {@link InterfaceStyle} to explicitly set the interface style.
   * Pass `null` to revert back to the system's default interface style.
   *
   * @param {InterfaceStyle | null} style - The desired interface style, or `null` to use the system setting.
   *
   * @returns {Promise<void>} A promise that resolves once the interface style has been updated.
   */
  async setInterfaceStyle(style: InterfaceStyle | null): Promise<void> {
    await SuperwallReactNative.setInterfaceStyle(style?.toString());
  }

  /**
   * Sets the delegate that handles Superwall lifecycle events.
   *
   * @param {SuperwallDelegate | undefined} delegate - An object implementing the {@link SuperwallDelegate} interface,
   * or `undefined` to remove the current delegate.
   *
   * @returns {Promise<void>} A promise that resolves once the delegate has been updated.
   */
  async setDelegate(delegate: SuperwallDelegate | undefined): Promise<void> {
    await this.awaitConfig();
    Superwall.delegate = delegate;
    await SuperwallReactNative.setDelegate(delegate === undefined);
  }

  /**
   * Retrieves the user attributes, set using {@link setUserAttributes}.
   *
   * @returns {Promise<UserAttributes>} A promise that resolves with an object representing the user's attributes.
   */
  async getUserAttributes(): Promise<UserAttributes> {
    await this.awaitConfig();
    const userAttributes: UserAttributes =
      await SuperwallReactNative.getUserAttributes();
    return userAttributes;
  }

  /**
   * Preloads all paywalls that the user may see based on campaigns and placements in your Superwall dashboard.
   *
   * To use this, first set `PaywallOptions.shouldPreload` to `false` when configuring the SDK.
   * Then call this function when you want preloading to begin.
   *
   * Note: This method will not reload any paywalls that have already been preloaded via {@link preloadPaywalls}.
   *
   * @returns {Promise<void>} A promise that resolves once the preloading process has been initiated.
   */
  async preloadAllPaywalls(): Promise<void> {
    await this.awaitConfig();
    await SuperwallReactNative.preloadAllPaywalls();
  }

  /**
   * Preloads paywalls for specific placements.
   *
   * To use this method, first ensure that {@link PaywallOptions.shouldPreload} is set to `false` when configuring the SDK.
   * Then call this function when you want to initiate preloading for selected placements.
   *
   * Note: This will not reload any paywalls you've already preloaded.
   *
   * @param {Set<string>} placementNames - A set of placement names whose paywalls you want to preload.
   *
   * @returns {Promise<void>} A promise that resolves once the preloading process has been initiated.
   */
  async preloadPaywalls(placementNames: Set<string>): Promise<void> {
    await this.awaitConfig();
    await SuperwallReactNative.preloadPaywalls(Array.from(placementNames));
  }

  /**
   * Sets user attributes for use in paywalls and on the Superwall dashboard.
   *
   * If an attribute already exists, its value will be overwritten while other attributes remain unchanged.
   * This is useful for analytics and campaign audience filters you may define in the Superwall Dashboard.
   *
   * **Note:** These attributes should not be used as a source of truth for sensitive information.
   *
   * For example, after retrieving your user's data:
   *
   * ```ts
   * const attributes: UserAttributes = {
   *   name: user.name,
   *   apnsToken: user.apnsTokenString,
   *   email: user.email,
   *   username: user.username,
   *   profilePic: user.profilePicUrl,
   * }
   * await Superwall.setUserAttributes(attributes)
   * ```
   *
   * See [Setting User Attributes](https://docs.superwall.com/docs/setting-user-properties) for more information.
   *
   * @param {UserAttributes} userAttributes - An object containing custom attributes to store for the user.
   *   Values can be any JSON-encodable value, URLs, or Dates. Keys beginning with `$` are reserved for Superwall and will be dropped.
   *   Arrays and dictionaries as values are not supported and will be omitted.
   *
   * @returns {Promise<void>} A promise that resolves once the user attributes have been updated.
   */
  async setUserAttributes(userAttributes: UserAttributes): Promise<void> {
    await this.awaitConfig();
    await SuperwallReactNative.setUserAttributes(userAttributes);
  }

  /**
   * Dismisses the presented paywall, if one exists.
   *
   * @returns {Promise<void>} A promise that resolves once the paywall has been dismissed,
   * or immediately if no paywall was active.
   */
  async dismiss(): Promise<void> {
    await SuperwallReactNative.dismiss();
  }
}

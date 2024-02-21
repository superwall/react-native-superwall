import { NativeModules, Platform } from 'react-native';
import type { PurchaseController } from './public/PurchaseController';
import type { SuperwallOptions } from './public/SuperwallOptions';
import type { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
import { PaywallInfo } from './public/PaywallInfo';
import { PaywallSkippedReason } from './public/PaywallSkippedReason';
import { v4 as uuidv4 } from 'uuid';
import { SubscriptionStatus } from './public/SubscriptionStatus';
import type { SuperwallDelegate } from './public/SuperwallDelegate';
import { SuperwallEventInfo } from './public/SuperwallEventInfo';
import { NativeEventEmitter } from 'react-native';
import type { IdentityOptions } from './public/IdentityOptions';

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
export { PurchaseResult } from './public/PurchaseResult';
export { RestorationResult } from './public/RestorationResult';
export { SubscriptionStatus } from './public/SubscriptionStatus';
//export { Superwall } from './Superwall';
export { SuperwallDelegate } from './public/SuperwallDelegate';
export { SuperwallEventInfo } from './public/SuperwallEventInfo';
export { SuperwallOptions } from './public/SuperwallOptions';
export { Survey } from './public/Survey';
export { TriggerResult } from './public/TriggerResult';
export { PaywallOptions } from './public/PaywallOptions';
export { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
export { PaywallPresentationRequestStatus } from './public/PaywallPresentationRequestStatus';
export { PaywallSkippedReason } from './public/PaywallSkippedReason';
export { RestoreType } from './public/RestoreType';

export default class Superwall {
  private static purchaseController?: PurchaseController;
  private static delegate?: SuperwallDelegate;
  private static _superwall = new Superwall();
  private eventEmitter = new NativeEventEmitter(SuperwallReactNative);
  private presentationHandlers: Map<string, PaywallPresentationHandler> =
    new Map();

  constructor() {
    this.eventEmitter.addListener('purchaseFromAppStore', async (data) => {
      var purchaseResult =
        await Superwall.purchaseController?.purchaseFromAppStore(
          data.productId
        );
      if (purchaseResult == null) {
        return;
      }
      SuperwallReactNative.didPurchase(purchaseResult.toJSON());
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
        SuperwallReactNative.didPurchase(purchaseResult.toJSON());
      }
    );

    this.eventEmitter.addListener('restore', async () => {
        var restorationResult =
          await Superwall.purchaseController?.restorePurchases();
        if (restorationResult == null) {
          return;
        }
        SuperwallReactNative.didRestore(restorationResult.toJson());
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
        const subscriptionStatus = SubscriptionStatus.fromString(
          data.subscriptionStatus
        );
        Superwall.delegate?.subscriptionStatusDidChange(subscriptionStatus);
      });

    this.eventEmitter.addListener('handleSuperwallEvent', async (data) => {
      const eventInfo = SuperwallEventInfo.fromJson(data.eventInfo);
      Superwall.delegate?.handleSuperwallEvent(eventInfo);
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
  }

  // Getter for the shared instance
  static get shared(): Superwall {
    return this._superwall;
  }

    /**
    apiKey: String,
    purchaseController: PurchaseController? = nil,
    options: SuperwallOptions? = nil,
    completion: (() -> Void)?
  ) {
     * @param options
     */
  static async configure(
    apiKey: string,
    options?: SuperwallOptions,
    purchaseController?: PurchaseController,
    completion?: () => void
  ): Promise<Superwall> {
    this.purchaseController = purchaseController;

    await SuperwallReactNative.configure(
      apiKey,
      options?.toJSON(),
      !!purchaseController
    ).then(() => {
      if (completion) completion();
    });

    return this._superwall;
  }

  identify(userId: string, options?: IdentityOptions) {
    SuperwallReactNative.identify(userId, options?.toJson());
  }

  reset() {
    SuperwallReactNative.reset();
  }

  async register(
    event: string,
    params?: Map<String, any>,
    handler?: PaywallPresentationHandler,
    feature?: () => void
  ) {
    let handlerId: string | null = null;

    if (handler) {
      const uuid = uuidv4().toString();
      this.presentationHandlers.set(uuid, handler);
      handlerId = uuid;
    }

    await SuperwallReactNative.register(event, params, handlerId).then(() => {
      if (feature) feature();
    });
  }

  setSubscriptionStatus(status: SubscriptionStatus) {
    SuperwallReactNative.setSubscriptionStatus(status.toString());
  }

  setDelegate(delegate: SuperwallDelegate | undefined) {
    Superwall.delegate = delegate;
    SuperwallReactNative.setDelegate(delegate === undefined);
  }
}

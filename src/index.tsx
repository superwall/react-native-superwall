import { NativeModules, Platform } from 'react-native';
import { PurchaseController } from './public/PurchaseController';
import { SuperwallOptions } from './public/SuperwallOptions';
import { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
import { PaywallInfo } from './public/PaywallInfo';
import { PaywallSkippedReason } from './public/PaywallSkippedReason';
import { SubscriptionStatus } from './public/SubscriptionStatus';
import { SuperwallDelegate } from './public/SuperwallDelegate';
import { SuperwallEventInfo } from './public/SuperwallEventInfo';
import { NativeEventEmitter } from 'react-native';
import { IdentityOptions } from './public/IdentityOptions';
import { EventEmitter } from 'events';

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
export {
  PurchaseResultPurchased,
  PurchaseResultPending,
  PurchaseResultCancelled,
  PurchaseResultFailed,
  PurchaseResultRestored,
} from './public/PurchaseResult';
export { RestorationResult } from './public/RestorationResult';
export { SubscriptionStatus } from './public/SubscriptionStatus';
//export { Superwall } from './Superwall';
export { SuperwallDelegate } from './public/SuperwallDelegate';
export { SuperwallEventInfo, EventType } from './public/SuperwallEventInfo';
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
  PaywallSkippedReasonEventNotFound,
  PaywallSkippedReasonHoldout,
  PaywallSkippedReasonNoRuleMatch,
  PaywallSkippedReasonUserIsSubscribed,
} from './public/PaywallSkippedReason';
export { RestoreType } from './public/RestoreType';

export default class Superwall {
  private static purchaseController?: PurchaseController;
  private static delegate?: SuperwallDelegate;
  private static _superwall = new Superwall();
  private eventEmitter = new NativeEventEmitter(SuperwallReactNative);
  private static configEmitter = new EventEmitter();
  private static didConfigure = false;
  private presentationHandlers: Map<string, PaywallPresentationHandler> =
    new Map();

  private static setDidConfigure(didConfigure: boolean) {
    this.didConfigure = didConfigure;
    // Emit an event when the bridged state is true
    if (didConfigure) {
      this.configEmitter.emit('configured', didConfigure);
    }
  }

  async awaitConfig(): Promise<void> {
    if (Superwall.didConfigure) {
      return;
    }

    await new Promise<void>((resolve) => {
      Superwall.configEmitter.once('configured', () => {
        resolve();
      });
    });
  }

  constructor() {
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
      options?.toJson(),
      !!purchaseController
    ).then(() => {
      if (completion) completion();
    });

    this.setDidConfigure(true);

    return this._superwall;
  }

  async identify(userId: string, options?: IdentityOptions) {
    await this.awaitConfig();

    const serializedOptions = options ? options.toJson() : null;

    await SuperwallReactNative.identify(userId, serializedOptions);
  }

  async reset() {
    await this.awaitConfig();
    await SuperwallReactNative.reset();
  }

  async register(
    event: string,
    params?: Map<String, any>,
    handler?: PaywallPresentationHandler,
    feature?: () => void
  ) {
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

    await SuperwallReactNative.register(event, paramsObject, handlerId).then(
      () => {
        if (feature) feature();
      }
    );
  }

  async getSubscriptionStatus(): Promise<SubscriptionStatus> {
    await this.awaitConfig();
    const subscriptionStatusString =
      await SuperwallReactNative.getSubscriptionStatus();
    return SubscriptionStatus.fromString(subscriptionStatusString);
  }

  async setSubscriptionStatus(status: SubscriptionStatus) {
    await this.awaitConfig();
    await SuperwallReactNative.setSubscriptionStatus(status.toString());
  }

  async setDelegate(delegate: SuperwallDelegate | undefined) {
    await this.awaitConfig();
    Superwall.delegate = delegate;
    await SuperwallReactNative.setDelegate(delegate === undefined);
  }
}

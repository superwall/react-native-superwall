import { NativeModules, Platform } from 'react-native';
import { PurchaseController } from './public/PurchaseController';
import { SuperwallOptions } from './public/SuperwallOptions';
import { PaywallPresentationHandler } from './public/PaywallPresentationHandler';
import { PaywallInfo } from './public/PaywallInfo';
import { PaywallSkippedReason } from './public/PaywallSkippedReason';
import { EntitlementStatus } from './public/EntitlementStatus';
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
export { PurchaseResult } from './public/PurchaseResult';
export {
  PurchaseResultPurchased,
  PurchaseResultPending,
  PurchaseResultCancelled,
  PurchaseResultFailed,
  PurchaseResultRestored,
} from './public/PurchaseResult';
export { RestorationResult } from './public/RestorationResult';
export { EntitlementStatus } from './public/EntitlementStatus';
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

interface UserAttributes {
  [key: string]: any;
}

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
      'entitlementStatusDidChange',
      async (data) => {
        const from = EntitlementStatus.fromString(data.from);
        const to = EntitlementStatus.fromString(data.to);
        Superwall.delegate?.entitlementStatusDidChange(from, to);
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
      !!purchaseController,
      version
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

  async handleDeepLink(url: string): Promise<Boolean> {
    await this.awaitConfig();
    return await SuperwallReactNative.handleDeepLink(url);
  }

  async register(
    placement: string,
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

    await SuperwallReactNative.register(placement, paramsObject, handlerId).then(
      () => {
        if (feature) feature();
      }
    );
  }

  async confirmAllAssignments(): Promise<ConfirmedAssignment[]> {
    await this.awaitConfig();
    const assignments = await SuperwallReactNative.confirmAllAssignments();
    return assignments.map((assignment: any) =>
      ConfirmedAssignment.fromJson(assignment)
    );
  }

  async getPresentationResult(
    placement: String,
    params?: Map<String, any>
  ): Promise<PresentationResult> {
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

  async getConfigurationStatus(): Promise<ConfigurationStatus> {
    const configurationStatusString =
      await SuperwallReactNative.getConfigurationStatus();
    return ConfigurationStatus.fromString(configurationStatusString);
  }

  async getEntitlements(): Promise<EntitlementsInfo> {
    await this.awaitConfig();
    const entitlementsJson = await SuperwallReactNative.getEntitlements();
    return EntitlementsInfo.fromObject(entitlementsJson);
  }

  async setEntitlementStatus(
    status: EntitlementStatus,
    entitlements: Array<Map<String, any>>
  ) {
    await this.awaitConfig();
    await SuperwallReactNative.setEntitlementStatus(status, entitlements);
  }

  async setInterfaceStyle(style: InterfaceStyle) {
    await SuperwallReactNative.setInterfaceStyle(style.toString());
  }

  async setDelegate(delegate: SuperwallDelegate | undefined) {
    await this.awaitConfig();
    Superwall.delegate = delegate;
    await SuperwallReactNative.setDelegate(delegate === undefined);
  }

  async getUserAttributes(): Promise<UserAttributes> {
    await this.awaitConfig();
    const userAttributes: UserAttributes =
      await SuperwallReactNative.getUserAttributes();
    return userAttributes;
  }

  async preloadAllPaywalls() {
    await this.awaitConfig();
    await SuperwallReactNative.preloadAllPaywalls();
  }

  async preloadPaywalls(placementNames: Set<string>) {
    await this.awaitConfig();
    await SuperwallReactNative.preloadPaywalls(Array.from(placementNames));
  }

  async setUserAttributes(userAttributes: UserAttributes) {
    await this.awaitConfig();
    await SuperwallReactNative.setUserAttributes(userAttributes);
  }

  async dismiss() {
    await SuperwallReactNative.dismiss();
  }
}

import { useEffect, useState, useCallback } from 'react';
import Superwall, {
  PaywallPresentationHandler,
  PurchaseController,
  SuperwallOptions,
} from '../index';
import { SubscriptionStatus } from '../public/SubscriptionStatus';
import type { Entitlement } from '../public/Entitlement';

// Conditional return type for useSubscriptionStatus based on whether a PurchaseController is provided
type UseSubscriptionStatusReturn<P extends PurchaseController | undefined> =
  P extends PurchaseController
    ? {
        subscriptionStatus: SubscriptionStatus;
        setSubscriptionStatus: (status: SubscriptionStatus) => Promise<void>;
      }
    : { subscriptionStatus: SubscriptionStatus };

/**
 * Hook to track and manage subscription status changes.
 *
 * This hook subscribes to subscription status updates from Superwall. Depending on whether
 * a PurchaseController is provided, it returns an object with a getter and a setter.
 *
 * - When the PurchaseController is used, the returned
 *   object includes:
 *   • `subscriptionStatus`: The current subscription state.
 *   • `setSubscriptionStatus`: A function to update the subscription status.
 *
 * - When a PurchaseController is not used, the hook returns an object that still includes both
 *   properties but `setSubscriptionStatus` is an error-throwing closure that will throw an error if used.
 *   This explicit error advises that subscription status changes should be handled by Superwall,
 *   and prevents accidental misuse.
 *
 * @example
 * // Write-enabled (with a PurchaseController):
 * const { subscriptionStatus, setSubscriptionStatus } = useSubscriptionStatus();
 *
 * // Read-only (without a PurchaseController):
 * // Note: Although "setSubscriptionStatus" is present, calling it will throw an error.
 * const { subscriptionStatus, setSubscriptionStatus } = useSubscriptionStatus();
 */
export function useSubscriptionStatus() {
  // Forward the purchase controller to the internal hook
  return useSubscriptionStatusInternal(Superwall.purchaseController);
}

function useSubscriptionStatusInternal<
  P extends PurchaseController | undefined = undefined
>(purchaseController?: P): UseSubscriptionStatusReturn<P> {
  const effectivePurchaseController =
    purchaseController ?? Superwall.purchaseController;

  const [subscriptionStatus, setSubscriptionStatusState] =
    useState<SubscriptionStatus>({
      status: 'UNKNOWN',
    });

  useEffect(() => {
    const listener = (status: SubscriptionStatus) => {
      setSubscriptionStatusState(status);
    };

    Superwall.shared.subscriptionStatusEmitter.addListener('change', listener);
  }, []);

  const setSubscriptionStatus = useCallback(
    async (status: SubscriptionStatus) => {
      await Superwall.shared.setSubscriptionStatus(status);
    },
    []
  );

  if (effectivePurchaseController != null) {
    return {
      subscriptionStatus,
      setSubscriptionStatus,
    } as UseSubscriptionStatusReturn<P>;
  } else {
    return {
      subscriptionStatus,
      setSubscriptionStatus: () => {
        throw new Error(
          '[Superwall] setSubscriptionStatus is not available when a PurchaseController is not provided. Superwall will manage subscription status automatically.'
        );
      },
    } as UseSubscriptionStatusReturn<P>;
  }
}

type UseEntitlementsReturn<P extends PurchaseController | undefined> =
  P extends PurchaseController
    ? {
        entitlements: Entitlement[];
        setEntitlements: (entitlements: Entitlement[]) => Promise<void>;
      }
    : { entitlements: Entitlement[] };

function useEntitlementsInternal<
  P extends PurchaseController | undefined = undefined
>(purchaseController?: P): UseEntitlementsReturn<P> {
  const effectivePurchaseController =
    purchaseController ?? Superwall.purchaseController;

  const [entitlements, innerSetEntitlements] = useState<Entitlement[]>([]);

  useEffect(() => {
    Superwall.shared.subscriptionStatusEmitter.addListener(
      'change',
      (status) => {
        switch (status.status) {
          case 'ACTIVE':
            innerSetEntitlements(status.entitlements);
            break;
          default:
            innerSetEntitlements([]);
            break;
        }
      }
    );

    const getInitialEntitlements = async () => {
      const currentEntitlements = await Superwall.shared.getEntitlements();
      innerSetEntitlements(currentEntitlements.active);
    };
    getInitialEntitlements();
  }, []);

  const setEntitlements = async (newEntitlements: Entitlement[]) => {
    if (newEntitlements.length > 0) {
      await Superwall.shared.setSubscriptionStatus({
        status: 'ACTIVE',
        entitlements: newEntitlements,
      });
    } else {
      await Superwall.shared.setSubscriptionStatus({ status: 'INACTIVE' });
    }
  };

  if (effectivePurchaseController != null) {
    return {
      entitlements,
      setEntitlements,
    } as UseEntitlementsReturn<P>;
  } else {
    return {
      entitlements,
      setEntitlements: (_: Entitlement[]) => {
        throw new Error(
          '[Superwall] setEntitlements is not available when a PurchaseController is not provided. Superwall will manage entitlements automatically.'
        );
      },
    } as UseEntitlementsReturn<P>;
  }
}

/**
 * Hook to track and manage user entitlements
 *
 * Public hook that uses the private generic version.
 *
 * @returns An object containing:
 * - entitlements: Array of current active entitlements.
 * - setEntitlements: Function to update entitlements.
 *
 * @example
 * ```tsx
 * function EntitlementsComponent() {
 *   const { entitlements, setEntitlements } = useEntitlements();
 *
 *   return (
 *     <div>
 *       {entitlements.map(entitlement => (
 *         <EntitlementItem key={entitlement.identifier} entitlement={entitlement} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export const useEntitlements = () =>
  useEntitlementsInternal(Superwall.purchaseController);

/**
 * Hook to register a feature with Superwall and handle the result
 * @param placement - The placement identifier for the feature
 * @param feature - The feature function to execute if access is granted
 * @param options - Optional presentation handler and other registration options
 * @returns A function to trigger the feature registration
 */
export const useRegister = (
  placement: string,
  feature: () => void | Promise<void>,
  options?: {
    params?: Map<String, any>;
    handler?: PaywallPresentationHandler;
  }
) => {
  return useCallback(async () => {
    await Superwall.shared.register({
      placement,
      params: options?.params,
      handler: options?.handler,
      feature,
    });
  }, [placement, feature, options?.handler, options?.params]);
};

/**
 * Hook to initialize and configure Superwall SDK
 *
 * @param config Configuration options for Superwall
 * @param config.apiKey Your Public API Key from the Superwall dashboard settings
 * @param config.options Optional SuperwallOptions to customize paywall appearance and behavior
 * @param config.purchaseController Optional PurchaseController for handling subscription logic
 *
 * @returns {Object} An object containing:
 * - isInitialized: boolean indicating if Superwall has completed initialization
 * - error: Error object if initialization failed, null otherwise
 * - instance: The configured Superwall instance (null if not initialized)
 *
 * @example
 * ```tsx
 * function App() {
 *   const { isInitialized, error, instance } = useSuperwall({
 *     apiKey: 'your-api-key',
 *     options: {
 *       // Optional configuration
 *     }
 *   });
 *
 *   if (error) {
 *     return <ErrorView error={error} />;
 *   }
 *
 *   if (!isInitialized) {
 *     return <LoadingView />;
 *   }
 *
 *   return <MainApp />;
 * }
 * ```
 */
export type UseSuperwallResult =
  | {
      status: 'initialized';
    }
  | {
      status: 'loading';
    }
  | {
      status: 'error';
      error: Error;
    };
export const useSuperwall = (config: {
  apiKey: string;
  options?: SuperwallOptions;
  purchaseController?: PurchaseController;
  completion?: (superwall: Superwall) => void;
}) => {
  const [result, setResult] = useState<UseSuperwallResult>({
    status: 'loading',
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        await Superwall.configure({
          apiKey: config.apiKey,
          options: config.options,
          purchaseController: config.purchaseController,
        });
        config.completion?.(Superwall.shared);
        setResult({ status: 'initialized' });
      } catch (e) {
        setResult({
          status: 'error',
          error:
            e instanceof Error ? e : new Error('Failed to configure Superwall'),
        });
      }
    };

    if (result.status === 'loading') {
      initialize();
    }
  }, [config, result.status]);

  return result;
};

/**
 * Hook to retrieve the shared and configured Superwall instance.
 *
 * This hook returns the shared instance of Superwall that has been configured via
 * {@link Superwall.configure}. If Superwall has not been configured yet, the hook
 * throws an error to alert you to initialize it first.
 *
 * @returns {Superwall} The configured Superwall shared instance.
 *
 * @throws {Error} If Superwall has not been configured.
 *
 * @example
 * function SomeComponent() {
 *   // Ensure that Superwall.configure has been called (and successfully initialized)
 *   const superwall = useSuperwallInstance();
 *
 *   // Now you can use the instance to interact with Superwall directly.
 *   // For example, dismiss a paywall:
 *   const dismissPaywall = async () => {
 *     await superwall.dismiss();
 *   };
 *
 *   return <button onClick={dismissPaywall}>Dismiss Paywall</button>;
 * }
 */
export function useSuperwallInstance(): Superwall {
  // Using a type assertion (as any) to bypass TypeScript's private member restriction.
  if (!(Superwall as any).didConfigure) {
    throw new Error(
      '[Superwall] Superwall is not configured yet. Please call Superwall.configure() before using useSuperwallInstance.'
    );
  }
  return Superwall.shared;
}

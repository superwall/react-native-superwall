import { Platform } from 'react-native';
import Superwall, {
  PurchaseController,
  PurchaseResult,
  RestorationResult,
  SubscriptionStatus,
  PurchaseResultCancelled,
  PurchaseResultFailed,
  PurchaseResultPending,
  PurchaseResultPurchased,
  PurchaseResultRestored,
} from '@superwall/react-native-superwall';
import Purchases, {
  type CustomerInfo,
  PRODUCT_CATEGORY,
  type PurchasesStoreProduct,
  type SubscriptionOption,
  PURCHASES_ERROR_CODE,
  type MakePurchaseResult,
} from 'react-native-purchases';

export class RCPurchaseController extends PurchaseController {
  constructor() {
    super();

    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);
    const apiKey =
      Platform.OS === 'ios'
        ? 'appl_XmYQBWbTAFiwLeWrBJOeeJJtTql'
        : 'goog_DCSOujJzRNnPmxdgjOwdOOjwilC';
    Purchases.configure({ apiKey });
  }

  syncSubscriptionStatus() {
    // Listen for changes
    Purchases.addCustomerInfoUpdateListener((customerInfo) => {
      const hasActiveEntitlementOrSubscription =
        this.hasActiveEntitlementOrSubscription(customerInfo);
      Superwall.shared.setSubscriptionStatus(
        hasActiveEntitlementOrSubscription
          ? SubscriptionStatus.ACTIVE
          : SubscriptionStatus.INACTIVE
      );
    });
  }

  async purchaseFromAppStore(productId: string): Promise<PurchaseResult> {
    const products = await Promise.all([
      Purchases.getProducts([productId], PRODUCT_CATEGORY.SUBSCRIPTION),
      Purchases.getProducts([productId], PRODUCT_CATEGORY.NON_SUBSCRIPTION),
    ]).then((results) => results.flat());

    // Assuming an equivalent for Dart's firstOrNull is not directly available in TypeScript,
    // so using a simple conditional check
    const storeProduct = products.length > 0 ? products[0] : null;

    if (!storeProduct) {
      return new PurchaseResultFailed(
        'Failed to find store product for $productId'
      );
    }

    return await this._purchaseStoreProduct(storeProduct);
  }

  async purchaseFromGooglePlay(
    productId: string,
    basePlanId?: string,
    offerId?: string
  ): Promise<PurchaseResult> {
    // Find products matching productId from RevenueCat
    const products = await Promise.all([
      Purchases.getProducts([productId], PRODUCT_CATEGORY.SUBSCRIPTION),
      Purchases.getProducts([productId], PRODUCT_CATEGORY.NON_SUBSCRIPTION),
    ]).then((results) => results.flat());

    // Choose the product which matches the given base plan.
    // If no base plan set, select first product or fail.
    const storeProductId = `${productId}:${basePlanId}`;

    // Initialize matchingProduct as null explicitly
    let matchingProduct: PurchasesStoreProduct | null = null;

    // Loop through each product in the products array
    for (const product of products) {
      // Check if the current product's identifier matches the given storeProductId
      if (product.identifier === storeProductId) {
        // If a match is found, assign this product to matchingProduct
        matchingProduct = product;
        // Break the loop as we found our matching product
        break;
      }
    }

    let storeProduct: PurchasesStoreProduct | null =
      matchingProduct ??
      (products.length > 0 && typeof products[0] !== 'undefined'
        ? products[0]
        : null);

    // If no product is found (either matching or the first one), return a failed purchase result.
    if (storeProduct === null) {
      return new PurchaseResultFailed('Product not found');
    }

    switch (storeProduct.productCategory) {
      case PRODUCT_CATEGORY.SUBSCRIPTION:
        const subscriptionOption =
          await this._fetchGooglePlaySubscriptionOption(
            storeProduct,
            basePlanId,
            offerId
          );
        if (subscriptionOption === null) {
          return new PurchaseResultFailed(
            'Valid subscription option not found for product.'
          );
        }
        return await this._purchaseSubscriptionOption(subscriptionOption);
      case PRODUCT_CATEGORY.NON_SUBSCRIPTION:
        return await this._purchaseStoreProduct(storeProduct);
      default:
        return new PurchaseResultFailed('Unable to determine product category');
    }
  }

  private async _purchaseStoreProduct(
    storeProduct: PurchasesStoreProduct
  ): Promise<PurchaseResult> {
    const performPurchase = async (): Promise<MakePurchaseResult> => {
      // Attempt to purchase product
      const makePurchaseResult = await Purchases.purchaseStoreProduct(
        storeProduct
      );
      return makePurchaseResult;
    };
    return await this.handleSharedPurchase(performPurchase);
  }

  private async _fetchGooglePlaySubscriptionOption(
    storeProduct: PurchasesStoreProduct,
    basePlanId?: string,
    offerId?: string
  ): Promise<SubscriptionOption | null> {
    const subscriptionOptions = storeProduct.subscriptionOptions;

    if (subscriptionOptions && subscriptionOptions.length > 0) {
      // Concatenate base + offer ID
      const subscriptionOptionId = this.buildSubscriptionOptionId(
        basePlanId,
        offerId
      );

      // Find first subscription option that matches the subscription option ID or use the default offer
      let subscriptionOption: SubscriptionOption | null = null;

      // Search for the subscription option with the matching ID
      for (const option of subscriptionOptions) {
        if (option.id === subscriptionOptionId) {
          subscriptionOption = option;
          break;
        }
      }

      // If no matching subscription option is found, use the default option
      subscriptionOption = subscriptionOption ?? storeProduct.defaultOption;

      // Return the subscription option
      return subscriptionOption;
    }

    return null;
  }

  private buildSubscriptionOptionId(
    basePlanId?: string,
    offerId?: string
  ): string {
    let result = '';

    if (basePlanId !== null) {
      result += basePlanId;
    }

    if (offerId !== null) {
      if (basePlanId !== null) {
        result += ':';
      }
      result += offerId;
    }

    return result;
  }

  private async _purchaseSubscriptionOption(
    subscriptionOption: SubscriptionOption
  ): Promise<PurchaseResult> {
    // Define the async perform purchase function
    const performPurchase = async (): Promise<MakePurchaseResult> => {
      // Attempt to purchase product
      const purchaseResult = await Purchases.purchaseSubscriptionOption(
        subscriptionOption
      );
      return purchaseResult;
    };

    const purchaseResult: PurchaseResult = await this.handleSharedPurchase(
      performPurchase
    );
    return purchaseResult;
  }

  private async handleSharedPurchase(
    performPurchase: () => Promise<MakePurchaseResult>
  ): Promise<PurchaseResult> {
    try {
      // Store the current purchase date to later determine if this is a new purchase or restore
      const purchaseDate = new Date();

      // Perform the purchase using the function provided
      const makePurchaseResult = await performPurchase();

      // Handle the results
      if (
        this.hasActiveEntitlementOrSubscription(makePurchaseResult.customerInfo)
      ) {
        const latestTransactionPurchaseDate = new Date(
          makePurchaseResult.transaction.purchaseDate
        );

        // If no latest transaction date is found, consider it as a new purchase.
        const isNewPurchase = latestTransactionPurchaseDate === null;

        // If the current date (`purchaseDate`) is after the latestTransactionPurchaseDate,
        const purchaseHappenedInThePast = latestTransactionPurchaseDate
          ? purchaseDate > latestTransactionPurchaseDate
          : false;

        if (!isNewPurchase && purchaseHappenedInThePast) {
          return new PurchaseResultRestored();
        } else {
          return new PurchaseResultPurchased();
        }
      } else {
        return new PurchaseResultFailed('No active subscriptions found.');
      }
    } catch (e: any) {
      // Catch block to handle exceptions, adjusted for TypeScript
      if (e.userCancelled) {
        return new PurchaseResultCancelled();
      }
      if (e.code === PURCHASES_ERROR_CODE.PAYMENT_PENDING_ERROR) {
        return new PurchaseResultPending();
      } else {
        return new PurchaseResultFailed(e.message);
      }
    }
  }

  async restorePurchases(): Promise<RestorationResult> {
    try {
      await Purchases.restorePurchases();
      return RestorationResult.restored();
    } catch (e: any) {
      return RestorationResult.failed(e.message);
    }
  }

  private hasActiveEntitlementOrSubscription(
    customerInfo: CustomerInfo
  ): Boolean {
    return (
      customerInfo.activeSubscriptions.length > 0 &&
      Object.keys(customerInfo.entitlements.active).length > 0
    );
  }
}

import { PurchaseResult } from './PurchaseResult';
import { RestorationResult } from './RestorationResult';

// Abstract class that defines the contract for a purchase controller
export abstract class PurchaseController {
  /**
   * Purchase a product from the App Store.
   * @param productId The product id of the product the user would like to purchase.
   * @returns A promise that resolves with the result of the purchase logic.
   */
  abstract purchaseFromAppStore(productId: string): Promise<PurchaseResult>;

  /**
   * Purchase a product from Google Play.
   * @param productId The product id of the product the user would like to purchase.
   * @param basePlanId An optional base plan identifier of the product that's being purchased.
   * @param offerId An optional offer identifier of the product that's being purchased.
   * @returns A promise that resolves with the result of the purchase logic.
   */
  abstract purchaseFromGooglePlay(
    productId: string,
    basePlanId?: string,
    offerId?: string
  ): Promise<PurchaseResult>;

  /**
   * Restore purchases.
   * @returns A promise that resolves with the restoration result.
   */
  abstract restorePurchases(): Promise<RestorationResult>;
}

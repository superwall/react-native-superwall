export class StoreTransaction {
  configRequestId: string;
  appSessionId: string;
  transactionDate?: Date | null;
  originalTransactionIdentifier: string;
  storeTransactionId?: string | null;
  originalTransactionDate?: Date | null;
  webOrderLineItemID?: string | null;
  appBundleId?: string | null;
  subscriptionGroupId?: string | null;
  isUpgraded?: boolean | null;
  expirationDate?: Date | null;
  offerId?: string | null;
  revocationDate?: Date | null;

  constructor({
    configRequestId,
    appSessionId,
    transactionDate,
    originalTransactionIdentifier,
    storeTransactionId,
    originalTransactionDate,
    webOrderLineItemID,
    appBundleId,
    subscriptionGroupId,
    isUpgraded,
    expirationDate,
    offerId,
    revocationDate,
  }: {
    configRequestId: string;
    appSessionId: string;
    transactionDate?: string | null;
    originalTransactionIdentifier: string;
    storeTransactionId?: string | null;
    originalTransactionDate?: string | null;
    webOrderLineItemID?: string | null;
    appBundleId?: string | null;
    subscriptionGroupId?: string | null;
    isUpgraded?: boolean | null;
    expirationDate?: string | null;
    offerId?: string | null;
    revocationDate?: string | null;
  }) {
    this.configRequestId = configRequestId;
    this.appSessionId = appSessionId;
    this.transactionDate = transactionDate ? new Date(transactionDate) : null;
    this.originalTransactionIdentifier = originalTransactionIdentifier;
    this.storeTransactionId = storeTransactionId || null;
    this.originalTransactionDate = originalTransactionDate
      ? new Date(originalTransactionDate)
      : null;
    this.webOrderLineItemID = webOrderLineItemID || null;
    this.appBundleId = appBundleId || null;
    this.subscriptionGroupId = subscriptionGroupId || null;
    this.isUpgraded = isUpgraded ?? null;
    this.expirationDate = expirationDate ? new Date(expirationDate) : null;
    this.offerId = offerId || null;
    this.revocationDate = revocationDate ? new Date(revocationDate) : null;
  }

  static fromJson(json: any): StoreTransaction {
    return new StoreTransaction({
      configRequestId: json.configRequestId,
      appSessionId: json.appSessionId,
      transactionDate: json.transactionDate,
      originalTransactionIdentifier: json.originalTransactionIdentifier,
      storeTransactionId: json.storeTransactionId,
      originalTransactionDate: json.originalTransactionDate,
      webOrderLineItemID: json.webOrderLineItemID,
      appBundleId: json.appBundleId,
      subscriptionGroupId: json.subscriptionGroupId,
      isUpgraded: json.isUpgraded,
      expirationDate: json.expirationDate,
      offerId: json.offerId,
      revocationDate: json.revocationDate,
    });
  }
}

// Defines the different types of views that can appear behind Apple's payment sheet during a transaction.
export enum TransactionBackgroundView {
  spinner = 'spinner',
  none = 'none',
}

// Defines the messaging of the alert presented to the user when restoring a transaction fails.
export class RestoreFailed {
  title: string = 'No Subscription Found';
  message: string = "We couldn't find an active subscription for your account.";
  closeButtonTitle: string = 'Okay';

  toJson(): object {
    return {
      title: this.title,
      message: this.message,
      closeButtonTitle: this.closeButtonTitle,
    };
  }
}

// Options for configuring the appearance and behavior of paywalls.
export class PaywallOptions {
  isHapticFeedbackEnabled: boolean = true;
  restoreFailed: RestoreFailed = new RestoreFailed();
  shouldShowPurchaseFailureAlert: boolean = true;
  shouldPreload: boolean = false;
  automaticallyDismiss: boolean = true;
  transactionBackgroundView: TransactionBackgroundView =
    TransactionBackgroundView.spinner;

  toJson(): object {
    return {
      isHapticFeedbackEnabled: this.isHapticFeedbackEnabled,
      restoreFailed: this.restoreFailed.toJson(),
      shouldShowPurchaseFailureAlert: this.shouldShowPurchaseFailureAlert,
      shouldPreload: this.shouldPreload,
      automaticallyDismiss: this.automaticallyDismiss,
      transactionBackgroundView: this.transactionBackgroundView,
    };
  }
}

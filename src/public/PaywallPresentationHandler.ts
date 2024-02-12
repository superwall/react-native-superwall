import { PaywallInfo } from './PaywallInfo';
import { PaywallSkippedReason } from './PaywallSkippedReason';

export class PaywallPresentationHandler {
  // Handlers for various events
  onPresentHandler?: (info: PaywallInfo) => void;
  onDismissHandler?: (info: PaywallInfo) => void;
  onErrorHandler?: (error: string) => void;
  onSkipHandler?: (reason: PaywallSkippedReason) => void;

  // Setters for the handlers
  onPresent(handler: (info: PaywallInfo) => void): void {
    this.onPresentHandler = handler;
  }

  onDismiss(handler: (info: PaywallInfo) => void): void {
    this.onDismissHandler = handler;
  }

  onError(handler: (error: string) => void): void {
    this.onErrorHandler = handler;
  }

  onSkip(handler: (reason: PaywallSkippedReason) => void): void {
    this.onSkipHandler = handler;
  }
}

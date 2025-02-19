export type PaywallResult =
  | {
      type: 'purchased';
      productId: string;
    }
  | {
      type: 'declined';
    }
  | {
      type: 'restored';
    };

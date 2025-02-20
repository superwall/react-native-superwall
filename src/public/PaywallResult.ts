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

export function fromJson(json: any): PaywallResult {
  switch (json.type) {
    case 'purchased':
      return {
        type: 'purchased',
        productId: json.productId || json.product?.id || '',
      };
    case 'declined':
      return { type: 'declined' };
    case 'restored':
      return { type: 'restored' };
    default:
      throw new Error(`Unknown PaywallResult type: ${json.type}`);
  }
}

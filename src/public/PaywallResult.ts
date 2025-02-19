import { Product } from './Product';

export type PaywallResult = {
  type: 'purchased';
  product: Product;
} | {
  type: 'declined';
} | {
  type: 'restored';
};

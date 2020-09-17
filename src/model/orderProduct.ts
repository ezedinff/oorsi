import { Product } from './product';
export interface OrderProduct {
    product: Product;
    soldPrice: number;
    quantity: number;
    totalPrice: number;
}
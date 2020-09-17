import { User } from './user';
import { Product } from './product';
export interface CartProduct {
    id: number;
    product: Product;
    forUser: User;
    quantity: number;
}
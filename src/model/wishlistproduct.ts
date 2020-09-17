import { Product } from './product';
import { Activity } from './activity';
export interface WishListProduct extends Activity {
    product: Product;
}
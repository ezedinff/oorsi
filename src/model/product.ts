import { ProductImageURL } from './productImageURL';
export interface Product {

    productId?: number;
    retailerId?: number;
    sku?: number;
    name?: string;
    regularPrice?: number;
    salePrice?: number;
    onSale?: boolean;
    manufacturer?: string;
    image?: string;
    largeFrontImage?: string;
    mediumImage?: string;
    thumbnailImage?: string;
    largeImage?: string;
    relatedProducts?: Product[],
    frequentlyPurchasedWith?: Product[],
    productImageURLs: ProductImageURL[];


}
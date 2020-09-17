import { Address } from './address';
import { OrderProduct } from './orderProduct';
import { User } from './user';
export interface Order {
    orderProducts: OrderProduct[];
    forUser: User;
    address: Address;
    date: Date;
    totalPrice: number;
}
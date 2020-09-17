import { User } from "./user";

export interface PhoneNumber {
    phoneNumber: string;
    confirmed?: boolean;
    user?: User;
}
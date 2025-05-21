import { Interest } from "./interest";

export interface FormData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    interest: Interest;
}

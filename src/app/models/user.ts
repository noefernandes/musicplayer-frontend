import { Role } from "./role";

export interface User {
    id?: string;
    fullname: string;
    email: string;
    password: string;
    role: Role;
}
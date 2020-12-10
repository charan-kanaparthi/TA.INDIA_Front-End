import { Role } from "./role";

export class User {
    id: number;
    name: string;
    password: string;
    email: string;
    mobile: number;
    role: Role;
    token?: string;
}
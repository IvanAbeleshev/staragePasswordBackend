import { typeRole } from "./enumRole";

export interface IUser {
    id: number,
    login: string,
    role: typeRole
}
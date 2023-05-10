export type UserCreateDTO = {
    email: string;
    name: string;
    phone: number;
    password: string;
    passwordconfirm?: string
}

export interface LoginDTO {
    email: string;
    password: string;
}
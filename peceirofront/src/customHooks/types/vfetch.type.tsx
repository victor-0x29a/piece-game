import { AxiosError } from "axios"

export type responseAPI = {
    error: boolean
    message: string
    data: any
}

export interface props {
    error: boolean | string
    message: string
    data: any
}

export type responseFetch = {
    error: boolean
    data: props
}

export type decodedToken = {
    id: number;
    authLevel: number;
};
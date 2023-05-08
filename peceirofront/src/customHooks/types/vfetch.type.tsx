import { AxiosResponse } from "axios"

export type responseFetch = {
    error: boolean
    message: string
    statusCode?: number
    response?: AxiosResponse
}
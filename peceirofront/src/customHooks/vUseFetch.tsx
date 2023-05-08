import axios, { AxiosResponse } from 'axios'
import { responseFetch } from './types/vfetch.type'


type thisProps = {
    endpoint: string,
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH"
    data: any
    headers: any
}

const vUseFetch = async ({
    endpoint,
    method,
    data,
    headers
}: thisProps): Promise<responseFetch> => {
    if (!endpoint || !method) {
        return {
            error: true,
            message: "Confira os dados fornecidos!"
        }
    }
    return await axios({
        url: "http://localhost:3000" + endpoint,
        method: method,
        data: data,
        headers: {
            ...headers
        }
    }).then((data: AxiosResponse) => {
        return {
            error: false,
            message: "Requisição ok.",
            statusCode: data.status,
            response: data
        }
    }).catch((err: AxiosResponse) => {
        return {
            error: true,
            message: "Requisição mal sucedida.",
            statusCode: err.status,
            response: err
        }
    })
}

export default vUseFetch
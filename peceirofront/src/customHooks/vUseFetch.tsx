import axios from 'axios'
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
    return new Promise(async (resolve, reject) => {
        await axios({
            url: "http://localhost:3000" + endpoint,
            headers: {
                ...headers
            },
            method: method,
            data: data
        }).then(({ data }) => {
            resolve({
                error: false,
                data: data
            })
        }).catch((err) => {
            reject({
                error: true,
                data: err["response"]["data"]
            })
        })
    })

}

export default vUseFetch
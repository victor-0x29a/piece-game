import jwt_decode from "jwt-decode";
import { decodedToken } from "./types/vfetch.type";


const vUseDecoded = (token: string): decodedToken => {
    return jwt_decode(token)
}

export default vUseDecoded
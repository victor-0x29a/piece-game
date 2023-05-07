export type account = {
    logged: boolean
    token: null | string
    expiresIn: number
    info: {
        name: string
        email: string
        telefone: string
    }
}
export type stateType = {
    account: account
}
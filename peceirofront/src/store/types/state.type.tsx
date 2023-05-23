export type account = {
    logged: boolean
    token: null | string
    expiresIn: number
    authLevel: number
    info: {
        name: string
        email: string
        telefone: number | null
    }
}

export type pieces_atualization = number

export type stateType = {
    pieces_atualization: number
    account: account
}
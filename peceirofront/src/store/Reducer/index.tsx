import { action } from '../types/action.type'
import { stateType } from '../types/state.type'

export const appReducer = (state: stateType = {
    pieces_atualization: 0,
    account: {
        logged: false,
        token: null,
        expiresIn: 0,
        authLevel: 0,
        info: {
            name: "Nenhum",
            email: "Nenhum",
            telefone: "Nenhum"
        }
    }
}, action: action) => {
    switch (action.type) {
        case "set_user":
            return {
                ...state,
                account: action.payload
            }
        case "att_pieces":
            return {
                ...state,
                pieces_atualization: Math.floor(Math.random() * 99999)
            }
        default:
            return state
    }
}

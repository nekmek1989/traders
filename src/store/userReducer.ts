export interface IUser {
    readonly id: string | number
    name: string
    password: string
    avatar: string | '../assets/icons/default-user.png'
    email: string
    subscribers: number
    addressWallet: string
    money: number
    accountType: string
    readonly createdAt: string
    headers: any
}

interface IAction {
    type: string
    payload: any
}

const defaultState = {
    id: null
}

const ADD_MONEY: string = 'ADD_MONEY'
const REMOVE_MONEY: string = 'REMOVE_MONEY'
const RECORD_USER: string = 'RECORD_USER'

export const userReducer = (state: IUser | {} = defaultState, action: IAction) => {
    switch (action.type) {
        case ADD_MONEY:
            //@ts-ignore
            return {...state, money: state.money + action.payload}
        case REMOVE_MONEY:
            //@ts-ignore
            if (state.money < action.payload) {
                return new Error('Недостаточно средств!')
            }
            //@ts-ignore
            return {...state, money: state.money - action.payload}
        case RECORD_USER:
            return {...action.payload}
        default:
            return state
    }
}

export const recordUser = (payload: string):IAction => ({type: 'RECORD_USER', payload})
export const addMoney = (payload: string): IAction => ({type: 'ADD_MONEY', payload})
export const removeMoney = (payload: IUser): IAction => ({type: 'REMOVE_MONEY', payload})
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface User {
    id: string | number
    name: string
    password: string
    avatar: string | '../assets/icons/default-user.png'
    email: string
    subscribers: number
    addressWallet: string
    money: number
    accountType: string
    createdAt: string
    headers: any
}

const defaultState: User = {
    id: '0',
    name: '',
    password: '',
    avatar: '',
    email: '',
    subscribers: 0,
    addressWallet: '',
    money: 0,
    accountType: '',
    createdAt: '',
    headers: '',
}

export const userReducer = createSlice({
    name: 'user',
    initialState: defaultState,
    reducers: {
        addMoney: (state, actions: PayloadAction<number>) => {
            state.money = state.money + actions.payload
        },

        removeMoney: (state, actions: PayloadAction<number>) => {
            state.money = state.money - actions.payload
        },

        recordUser: (_, actions: PayloadAction<User>) => {
            return  {...actions.payload}
        }
    }
})

export const {addMoney, removeMoney, recordUser} = userReducer.actions
export default userReducer.reducer
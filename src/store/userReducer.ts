import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChannel} from "../components/Channel/ChannelCard/types";

export interface User {
    id: string | number
    name: string
    password: string
    avatar: string
    email: string
    subscribers: number
    addressWallet: string
    money: number
    accountType: string
    createdAt: string
    headers: any
    subscriptions: IChannel[] | []
    ownedChannels: IChannel[] | []
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
    subscriptions: [],
    ownedChannels: []
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
        },

        subscribe: (state, actions: PayloadAction<IChannel>) => {
            state.subscriptions = [...state.subscriptions, actions.payload]
        },

        unSubscribe: (state, actions: PayloadAction<IChannel>) => {
            state.subscriptions = state.subscriptions.filter(channel => {
                return channel.id !== actions.payload.id
            })
        },

        changeEmail: (state, actions: PayloadAction<string>) => {
            state.email = actions.payload
        },

        changePassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        }
    }
})

export const {addMoney, removeMoney, recordUser, subscribe, unSubscribe, changeEmail, changePassword} = userReducer.actions
export default userReducer.reducer
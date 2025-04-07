import {createSlice} from "@reduxjs/toolkit";

export interface Section {
    section: 'main' | 'balance'
}

const defaultState: Section = {
    section: "main"
}

export const  sectionReducer = createSlice({
    name: 'section',
    initialState: defaultState,
    reducers: {
        selectMain: state => {
            state.section = 'main'
        },

        selectBalance: state => {
            state.section = 'balance'
        }
    }
})

export const {selectMain, selectBalance} = sectionReducer.actions
export default sectionReducer.reducer
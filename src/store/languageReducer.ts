import {createSlice} from "@reduxjs/toolkit";

export interface LanguageState {
    lang: 'russian' | 'english'
}

const defaultState: LanguageState = {
    lang: 'russian'
}

export const languageReducer = createSlice({
    name: 'language',
    initialState: defaultState,
    reducers: {
        selectEn: state => {
            state.lang = 'english'
        },
        selectRu: state => {
            state.lang = 'russian'
        }
    }
})

export const {selectEn, selectRu} = languageReducer.actions
export default languageReducer.reducer
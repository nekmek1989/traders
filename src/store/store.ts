import {languageReducer} from "./languageReducer.ts";
import {configureStore} from "@reduxjs/toolkit";
import {sectionReducer} from "./sectionReducer.ts";
import {userReducer} from "./userReducer.ts";

export const store =  configureStore({
    reducer: {
        language: languageReducer.reducer,
        section: sectionReducer.reducer,
        user: userReducer.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
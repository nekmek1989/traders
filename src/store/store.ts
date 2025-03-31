import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {userReducer} from "./userReducer.ts";
import {languageReducer} from "./languageReducer.ts";
import {sectionReducer} from "./sectionReducer.ts";

const rootReducer = combineReducers({
    user: userReducer,
    language: languageReducer,
    section: sectionReducer
})
//@ts-ignore
export const store = createStore(rootReducer, composeWithDevTools())
import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {userReducer} from "./userReducer.ts";

const rootReducer = combineReducers({
    user: userReducer
})
//@ts-ignore
export const store = createStore(rootReducer, composeWithDevTools())
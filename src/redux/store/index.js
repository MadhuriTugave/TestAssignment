import { combineReducers, createStore } from "redux";
import { userCreater } from "../reducers";


export const store =createStore (
       combineReducers({
        LoginLogoutUser : userCreater,
     
       })
)
import {applyMiddleware,createStore,compose} from "redux"
// import thunk from "redux-thunk"
import {Reducers} from "../reducers"
import {MiddleWare} from "../middleware"
import { configureStore } from "@reduxjs/toolkit";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store =configureStore(
    Reducers,composeEnhancers(applyMiddleware(...MiddleWare))
)




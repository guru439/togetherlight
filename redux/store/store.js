import {applyMiddleware,createStore,compose} from "redux"
// import thunk from "redux-thunk"
import {Reducers} from "../reducers"
import {MiddleWare} from "../middleware"
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import mySaga from '../saga/fetchPosts'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 
const sagaMiddleware = createSagaMiddleware() // Saga Middleware

const store = createStore(
    Reducers,composeEnhancers(applyMiddleware(...MiddleWare, sagaMiddleware))
) //Creating Store
sagaMiddleware.run(mySaga) //Running Saga to take effects

export default store


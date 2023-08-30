import AsyncStorage from "@react-native-community/async-storage"
import { removeError } from "../actions/_Loader"
import * as actionTypes from "../_ActionsType"
import {updateObject} from "./utility"

const initialState={
    isAuthenticated:false,
    data:null,
    error:null,
    userDetails: null,
    forgot: null
}


const loginSuccess=(action,state)=>{
    AsyncStorage.setItem("userDetail", JSON.stringify(action.payload))
    return updateObject(state,{
        isAuthenticated:true,
        data:action.payload.user,
        error:null,
        userDetails: action.payload.user
    })
}

const loginFail=(action,state)=>{
    return updateObject(state,{
        isAuthenticated: false,
        data:null,
        error:action.payload    
    })
}

const forgotSuccess=(action,state)=>{
    return updateObject(state,{
        isAuthenticated:true,
        forgot:action.payload,
        error:null
    })
}

const forgotFail=(action,state)=>{
    return updateObject(state,{
        isAuthenticated: false,
        forgot:null,
        error:action.payload    
    })
}


const logout=(action,state)=>{
    AsyncStorage.removeItem("userDetail")
    return updateObject(state,{
        isAuthenticated:false,
        data:null,
        userDetails: null
    })
}

const RemoveError = (action, state) => {
    return updateObject(state,{
        isAuthenticated:false,
        data:null,
        error:null,
        forgot: null
    })
}

const PostsReducer =(state=initialState,action)=>{
    // console.log(action)
    switch (action.type){
        case actionTypes.UPDATE_LOGIN_DATA_SUCCESS:return loginSuccess(action,state)
        case actionTypes.VERIFYGOOGLEAUTH_DATA_SUCCESS:return loginSuccess(action,state);
        case actionTypes.VERIFYEMAIL_DATA_SUCCESS:return loginSuccess(action,state);
        case actionTypes.UPDATE_LOGIN_DATA_FAIL:return loginFail(action,state);
        case actionTypes.LOGOUT_START: return logout(action, state)
        default:
            return state
    }
}

export default PostsReducer
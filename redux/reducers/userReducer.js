// import AsyncStorage from "@react-native-community/async-storage"
import * as actionTypes from "../_ActionsType"
import {updateObject} from "./utility"

const initialState={
    userDetails: null,
    posts: [],
    error: null
}


const loginSuccess=(action,state)=>{
    // AsyncStorage.setItem("userDetail", JSON.stringify(action.payload))
    return updateObject(state,{
        error:null,
        userDetails: action.payload
    })
}

const loginFail=(action,state)=>{
    return updateObject(state,{
        error:action.payload,
        userDetails: null 
    })
}

const postsSuccess=(action,state)=>{
    return updateObject(state,{
        error:null,
        posts: action.payload
    })
}

const postsFail=(action,state)=>{
    return updateObject(state,{
        error:action.payload,
        posts: [] 
    })
}



const logout=(action,state)=>{
    AsyncStorage.removeItem("userDetail")
    return updateObject(state,{
        userDetails: null
    })
}


const userReducer =(state=initialState,action)=>{
    // console.log(action)
    switch (action.type){
        case actionTypes.UPDATE_USER_DATA_SUCCESS:return loginSuccess(action,state)
        case actionTypes.UPDATE_USER_DATA_FAIL:return loginFail(action,state);
        case actionTypes.UPDATE_POSTS_DATA_SUCCESS:return postsSuccess(action,state)
        case actionTypes.UPDATE_POSTS_DATA_FAIL:return postsFail(action,state);
        case actionTypes.LOGOUT_START: return logout(action, state)
        default:
            return state
    }
}

export default userReducer
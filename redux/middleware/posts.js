import * as  actionTypes from "../_ActionsType"
import {showLoader,hideLoader} from "../actions/_Loader"
import {apiRequest} from "../actions/_API"
import * as API from "../API_URI"
import AsyncStorage from '@react-native-community/async-storage';
import * as RootNavigation from "../../navigation/RootNavigation"
export const initiatePosts=({dispatch})=>next=>action=>{
    if(action.type===actionTypes.GET_POSTS_START){
        dispatch(showLoader())
        // dispatch(apiRequest('GET',API.POSTS,null,actionTypes.POSTS_SUCCESS,actionTypes.POSTS_FAIL,action.payload))
    }
    next(action)
}


export const postsSuccess=({dispatch})=>next=>action=>{
    // console.log(action)
    if(action.type===actionTypes.POSTS_SUCCESS){
        // saveAccessToken(action.payload.data)
        dispatch({
            type: actionTypes.UPDATE_POSTS_DATA_SUCCESS,
            payload: action.payload
        })
        // console.log("Access Token: ",action.payload.accessToken)
        dispatch(hideLoader())
    }
    next(action)
}


export const postsFail=({dispatch})=>next=>action=>{
    if(action.type===actionTypes.POSTS_FAIL){
        dispatch({
            type: actionTypes.UPDATE_POSTS_DATA_FAIL,
            payload: action.payload
        })
        dispatch(hideLoader())
    }
    next(action)
}




export const postsMiddleware=[initiatePosts,postsSuccess,postsFail]
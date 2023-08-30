import * as actionTypes from "../_ActionsType"
import * as API from "../API_URI.js"
import axios from "axios"

// const accessToken = AsyncStorage.getItem('accessToken')

export const api = ({dispatch})=>next=>async action=>{
    
    if(action.type == actionTypes.API_REQUEST){
        let {method,url,onSuccess,onError,data}=action.meta;
        // console.log(API.BASE_API + url)
        let BASE = API.BASE_API;
        axios({
            url:url,
            method:method,
            baseURL:BASE,
            headers,
            data:data,
            query: data,
            transformResponse:[(data)=>{
                // console.log(data);
            }],
        }).then(res=>{
            if(res.request){
                dispatch({type:onSuccess,payload:JSON.parse(res.request.response)})
            }    
        })
        .catch(error=>{
            // console.log(error)
            if(error.response){
                dispatch({type:onError,payload:JSON.parse(error.response.request._response)})
            }
        })
    }
    return next(action)
}

export const apiMiddleware=[api]
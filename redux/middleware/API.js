import * as actionTypes from "../_ActionsType"
import * as API from "../../API_URI.js"
import axios from "axios"
import AsyncStorage from '@react-native-community/async-storage';

// const accessToken = AsyncStorage.getItem('accessToken')

export const api = ({dispatch})=>next=>async action=>{
    
    if(action.type == actionTypes.API_REQUEST){
        let {method,url,onSuccess,onError,data}=action.meta;
        // console.log("API Params: ",data)
        let user = await AsyncStorage.getItem('user')
        // console.log(user)
        let headers = {}
        if(user != "null" && user != null){
            user = JSON.parse(user)
            // console.log("USER", user.authToken)
            headers = {
                Authorization: user.authToken
            }
        }
        // console.log(API.BASE_API + url)
        let BASE = API.BASE_API;
        if(method == "GOOGLE"){
            method = "GET";
            BASE = API.GOOGLE_API_URL
            url = url + `?key=${API.GOOGLE_API_KEY}&origin=${data["origin"]}&destination=${data["destination"]}`;
            // console.log(url)
        }
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
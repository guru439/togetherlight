import * as API from '../redux/API_URI'
import axios from 'axios';

//Fetch posts api call
export async function getPosts(params) {
    try {
        let BASE = API.BASE_API;
        let res = await axios({
            url:API.POSTS,
            method:"GET",
            baseURL:BASE,
        })
        return res.data;
    } catch (error) {
        console.log("Error at API Call ", error)
        return false
    }
  }
  
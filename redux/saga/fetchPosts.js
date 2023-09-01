import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import * as Api from '../API_URI'
import * as actionTypes from "../_ActionsType"
import { getPosts } from '../../ApiCalls/getPosts';

// Worker saga will be fired on POST_FETCH_REQUESTED actions
export function* fetchPosts(action) {
   try {
        console.log(Api.BASE_API + Api.POSTS)
        const posts = yield call(getPosts);
        console.log(posts)
        yield put({type: actionTypes.UPDATE_POSTS_DATA_SUCCESS, payload: posts});
        return posts
   } catch (e) {
    console.log(e)
      yield put({type: actionTypes.UPDATE_POSTS_DATA_FAIL, payload: e.message});
      return e.message
   }
}

// Starts fetchPost on each dispatched POST_FETCH_REQUESTED action
// Allows concurrent fetches of posts
export default function* mySaga() {
  // yield takeEvery(actionTypes.GET_POSTS_START, fetchPosts);
}
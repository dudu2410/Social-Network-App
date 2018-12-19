import { combineReducers } from 'redux'
import {postReducer} from './PostReducer'
import followersReducer from './FollowersReducer'

export const mainReducer = combineReducers({
    postReducer,followersReducer,
});
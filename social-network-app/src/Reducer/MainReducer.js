import { combineReducers } from 'redux'
import {postReducer} from './PostReducer'
import followersReducer from './FollowersReducer'
import { appReducer } from './AppReducer'

export const mainReducer = combineReducers({
    postReducer,followersReducer,appReducer,
});
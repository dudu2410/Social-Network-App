import { combineReducers } from 'redux'
import {postReducer} from './PostReducer'

export const mainReducer = combineReducers({
    postReducer,
});
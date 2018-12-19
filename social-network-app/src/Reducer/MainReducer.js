import { combineReducers } from 'redux'
import { postReducer } from './PostReducer'
import { appReducer } from './AppReducer'

export const mainReducer = combineReducers({
    postReducer, appReducer,
});
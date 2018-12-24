import { CHANGE_CURRENT_VIEW_USER, LOGIN, LOGOUT, LOAD_CURRENT_VIEW_USER_INFO } from '../Actions/Actions'
import history from '../history';
var {GetPKFromFK} = require('../lib/tx');


const initialState = {
    isLogin : localStorage.privatekey ? true : false,
    currentLogginAddress : localStorage.privatekey ? GetPKFromFK(localStorage.privatekey) : null,
    currentViewAddress: localStorage.privatekey ? GetPKFromFK(localStorage.privatekey) : null,
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_VIEW_USER:
            return Object.assign({}, state, {
                currentViewAddress: action.address
            })
        case LOAD_CURRENT_VIEW_USER_INFO: {
            return Object.assign({}, state, {
                currentViewUserInfo: action.currentViewUserInfo
            })
        }
        case LOGIN:
            history.push('/home');
            return Object.assign({}, state,{
                isLogin: action.state.isLogin,
                currentLogginAddress: action.state.currentLogginAddress,
                currentViewAddress: action.state.currentViewAddress,
            });
        case LOGOUT:
            localStorage.removeItem('privatekey');
            return Object.assign({}, state,{
                isLogin: false,
                currentLogginAddress: null,
            });
        default:
            return state;
    }
}
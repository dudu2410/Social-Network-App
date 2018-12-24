import { CHANGE_CURRENT_VIEW_USER, LOGIN, LOGOUT } from '../Actions/Actions'
import history from '../history';
var {GetPKFromFK} = require('../lib/tx');


const initialState = {
    isLogin : localStorage.privatekey ? true : false,
    currentLogginAddress : localStorage.privatekey ? GetPKFromFK(localStorage.privatekey) : null,
    currentViewAddress : 'GAO4J5RXQHUVVONBDQZSRTBC42E3EIK66WZA5ZSGKMFCS6UNYMZSIDBI',
}

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_VIEW_USER:
            return Object.assign({}, state, {
                current_user: action.address
            })
        case LOGIN:
            history.push('/home');
            state.isLogin = action.state.isLogin;
            state.currentLogginAddress = action.state.currentLogginAddress;
            console.log(state);
            return Object.assign({}, state);
        case LOGOUT:
            state.isLogin = false;
            state.currentLogginAddress = null;
            localStorage.removeItem('privatekey');
            return Object.assign({}, state);
        default:
            return state;
    }
}
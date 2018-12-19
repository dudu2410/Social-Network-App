import { ADD_POST, LOAD_POST, CHANGE_CURRENT_VIEW_USER } from '../Actions/Actions'



const initialState = {};

export function appReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CURRENT_VIEW_USER:
            return Object.assign({}, state, {
                current_user: action.address
            })
        default:
            return state;
    }
}
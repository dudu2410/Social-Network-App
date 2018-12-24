import { ADD_FOLLOWERS,LOAD_FOLLOWERS } from '../Actions/Actions'

const initialState = {};

export default function followersReducer(state = initialState, action) {
    console.log("action name" + action.type+action.id+action.avatar+action.username);
    switch (action.type) {
        case ADD_FOLLOWERS:
        console.log("followrsReducer" + state);
            return Object.assign({}, state, {
                followers: [
                    ...state.followers,
                    {
                        id: action.id,
                        avatar: action.avatar,
                        username: action.username,
                        key: action.key,
                    }
                ]
            })
            case LOAD_FOLLOWERS:
            console.log("assing loadfoolwer: " + action.followers.length)
            return Object.assign({}, state, {
                followers: action.followers
            })
            default:

            return state;
    }
}
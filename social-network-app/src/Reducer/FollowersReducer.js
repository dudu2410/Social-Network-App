import { ADD_FOLLOWERS,LOAD_FOLLOWERS } from '../Actions/Actions'

const initialState = {
    followers: [{
        public_key: 1,
        avatar: "http://placekitten.com/200/200",
        username: "Dummy user",
    }],
    isInit: true,
};

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
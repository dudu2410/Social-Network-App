import { ADD_FOLLOWERS } from '../Actions/Actions'

const initialState = {
    followers: [
        {
            id: 1,
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
        },
        {
            id: 2,
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
        },
        {
            id: 3,
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
        },
    ],
    user: {
        public_key: 1,
        avatar: "http://placekitten.com/200/200",
        username: "Dummy user",
    }
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
            default:

            console.log("followrsReducer after: " + state)
            return state;
    }
}
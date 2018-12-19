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

export function followersReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_FOLLOWERS:
            return Object.assign({}, state, {
                posts: [
                    ...state.followers,
                    {
                        id: action.id,
                        avatar: action.avatar,
                        username: action.username,
                    }
                ]
            })
        default:
            return state;
    }
}
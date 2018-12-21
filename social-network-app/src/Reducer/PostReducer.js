import { ADD_POST, LOAD_POST } from '../Actions/Actions'



const initialState = {
    user: {
        public_key: 1,
        avatar: "http://placekitten.com/200/200",
        username: "Dummy user",
    },
    isInit: true,
};

export function postReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [
                    ...state.posts,
                    {
                        id: action.id,
                        type: action.type,
                        content: action.content,
                        content_type: action.content_type,
                        from: action.from,
                        to: action.to,
                        sequence: action.sequence,
                        avatar: action.avatar,
                        username: action.username,
                        heart: action.heart,
                        comment: action.comment,
                        share: action.share,
                    }
                ]
            })  
        case LOAD_POST:
            return Object.assign({}, state, {
                posts: action.posts
            })
        default:
            return state;
    }
}
import { ADD_POST, LOAD_POST } from '../Actions/Actions'


const initialState = {}
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
                        sequence: action.sequence,
                        heart: action.heart,
                        comment: action.comment,
                        share: action.share,
                        current_view_address: action.current_view_address
                    }
                ]
            })  
        case LOAD_POST:
            console.log('loading post');
            return Object.assign({}, state, {
                posts: action.posts,
            })
        default:
            return state;
    }
}
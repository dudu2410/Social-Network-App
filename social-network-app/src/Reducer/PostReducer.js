import { ADD_POST } from '../Actions/Actions'

const initialState = {
    posts: [
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis odit doloribus at aspernatur deserunt repellendus modi eaque ipsa fugit! Ullam animi, doloremque nisi inventore vel voluptatibus nulla dicta nam libero!",
            timestamp: "02-12-2018",
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
            heart: 9999,
            comment: 9999,
            share: 9999,
        },
        {
            id: 2,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis odit doloribus at aspernatur deserunt repellendus modi eaque ipsa fugit! Ullam animi, doloremque nisi inventore vel voluptatibus nulla dicta nam libero!",
            timestamp: "01-12-2018",
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
            heart: 121,
            comment: 234,
            share: 45,
        },
        {
            id: 3,
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis odit doloribus at aspernatur deserunt repellendus modi eaque ipsa fugit! Ullam animi, doloremque nisi inventore vel voluptatibus nulla dicta nam libero!",
            timestamp: "30-11-2018",
            avatar: "http://placekitten.com/200/200",
            username: "Dummy user",
            heart: 432,
            comment: 654,
            share: 23,
        },
    ],
    user: {
        public_key: 1,
        avatar: "http://placekitten.com/200/200",
        username: "Dummy user",
    }
};

export function postReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return Object.assign({}, state, {
                posts: [
                    ...state.posts,
                    {
                        id: action.id,
                        content: action.content,
                        timestamp: action.timestamp,
                        avatar: action.avatar,
                        username: action.username,
                        heart: action.heart,
                        comment: action.comment,
                        share: action.share,
                    }
                ]
            })
        default:
            return state;
    }
}
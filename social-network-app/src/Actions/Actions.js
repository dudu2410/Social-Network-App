var { decode } = require('../lib/tx');


export const ADD_POST = 'ADD_POST';
export const LOAD_POST = 'LOAD_POST';
export const CHANGE_CURRENT_VIEW_USER = 'CHANGE_CURRENT_VIEW_USER';


export function addPost(id, type, content, content_type, sequence, from, avatar, username, heart, comment, share) {
    return {
        type: ADD_POST,
        id,
        type,
        content,
        content_type,
        from,
        sequence,
        avatar,
        username,
        heart,
        comment,
        share
    }
}

export function loadPosts(posts) {
    return {
        type: LOAD_POST,
        posts,
    }
}

export function changeCurrentViewUser(address) {
    return {
        type: CHANGE_CURRENT_VIEW_USER,
        address,
    }
}

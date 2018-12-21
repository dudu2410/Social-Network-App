var { decode } = require('../lib/tx');


export const ADD_POST = 'ADD_POST'; 
export const ADD_FOLLOWERS = 'ADD_FOLLOWERS';
export const LOAD_POST = 'LOAD_POST';
export const CHANGE_CURRENT_VIEW_USER = 'CHANGE_CURRENT_VIEW_USER';


export function addPost(id, type, content, content_type, sequence, from, to, avatar, username, heart, comment, share) {
    return {
        type: ADD_POST,
        id,
        type,
        content,
        content_type,
        from,
        to,
        sequence,
        avatar,
        username,
        heart,
        comment,
        share
    }
}

export function addFollower(id, avatar, username) {
    console.log("addFollower");
    return {
        type: ADD_FOLLOWERS,
        id,
        avatar,
        username,
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

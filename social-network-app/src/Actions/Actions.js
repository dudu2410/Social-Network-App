

export const ADD_POST = 'ADD_POST'; 
export const ADD_FOLLOWERS = 'ADD_FOLLOWERS';

export function addPost(id, content, timestamp, avatar, username, heart, comment, share) {
    return {
        type: ADD_POST,
        id,
        content,
        timestamp,
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

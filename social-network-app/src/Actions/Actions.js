

export const ADD_POST = 'ADD_POST';


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
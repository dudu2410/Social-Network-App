

export const ADD_POST = 'ADD_POST';
export const ADD_FOLLOW = 'ADD_FOLLOW';


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

export function addFollow(id1,username1,id2,username2)
{
    return{
        type: ADD_FOLLOW,
        id1,
        username1,
        id2,
        username2
    }
}
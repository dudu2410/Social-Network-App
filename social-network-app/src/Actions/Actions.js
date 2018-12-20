var { decode } = require('../lib/tx');
var {GetPKFromFK} = require('../lib/tx');



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

export function login(data){
    return dispatch => {
        console.log(data.privatekey);  
        var PublicKey = GetPKFromFK(data.privatekey);

        

        // return axios.get('http://localhost:3002/get/current_user_info?address=GDOU3TTWZ4BEQCUK5QTJ2WNFFN5S3JEUJOO7GA6SJJ5BVJWUAROCZISN');
    }
}
export const ADD_POST = 'ADD_POST';
export const LOAD_POST = 'LOAD_POST';
export const CHANGE_CURRENT_VIEW_USER = 'CHANGE_CURRENT_VIEW_USER';
export const LOGIN = 'LOGIN';


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

export function login(privatekey) {
    return {
        type: LOGIN,
        privatekey,
    }
}



// export function login(data){
//     return dispatch => {
//         console.log(data.privatekey);  
//         var PublicKey = GetPKFromFK(data.privatekey);

        
//         var getAccountAPI = `https://komodo.forest.network/tx_search?query="account=%27${PublicKey}%27"`;
//         var result = axios.get(getAccountAPI);

//         result.then( (res) => {
//             console.log(res.data.result.total_count);
//         });

//         return result;
//     }
// }
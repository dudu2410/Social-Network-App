import axios from 'axios'
import {GetPKFromFK} from './../lib/tx';

export const ADD_POST = 'ADD_POST';
export const LOGIN = 'LOGIN';


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

export function login(data){
    return dispatch => {
        console.log(data.privatekey);  
        console.log(GetPKFromFK(data.privatekey));
        return axios.get('http://localhost:3002/login/:123');
    }
}
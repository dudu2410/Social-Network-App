import React, { Component } from 'react'
import '../Css/Semi-Header.css'

export const SemiHeader = ({followers,onFollowClick}) => {
    console.log("ham la:" + onFollowClick);
    const owner = {
        id: 4,
        avatar: "http://placekitten.com/200/200",
        username: "minh dong",
    }
console.log("oject: "+owner);
    return (
        <ul>
            <li className="space"><a>Posts</a></li>
            <li><a href="/followers" style = {{color : "red"}}>Followers</a></li> 
            <li>
                <a href="" style = {{color : "red"}} onClick={(e) => {onFollowClick(e, owner);}}>Follow</a>
            </li>
            <li><a>Likes</a></li>
            <li><a>Lists</a></li>
            <li><a>Moments</a></li>
        </ul>
    )
}
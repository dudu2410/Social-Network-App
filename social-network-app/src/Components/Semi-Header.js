import React from 'react'
import '../Css/Semi-Header.css'
import {Link} from 'react-router-dom'

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
            <Link to="/"><li className="space"><a href='' style = {{color : "red"}}>Posts</a></li></Link>
            <Link to="/followers"><li><a href='' style = {{color : "red"}}>Followers</a></li></Link> 
            <Link to="/"><li><a href="/followers" style = {{color : "red"}} onClick={(e) => {onFollowClick(e, owner);}}>Follow</a>
            </li></Link>
            <Link to="/"><li><a href='' style = {{color : "black"}}>Likes</a></li></Link>
            <Link to="/"><li><a href='' style = {{color : "black"}}>Lists</a></li></Link>
            <Link to="/"><li><a href='' style = {{color : "black"}}>Moments</a></li></Link>
        </ul>
        
    )
}
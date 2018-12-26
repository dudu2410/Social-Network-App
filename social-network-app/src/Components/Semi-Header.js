import React from 'react'
import '../Css/Semi-Header.css'
import {Link} from 'react-router-dom'

export const SemiHeader = ({onFollowClick,currentViewAddress, loadPosts}) => {
    console.log("ham loadPosts:" + loadPosts);
    const owner = {
        id: 4,
        avatar: "http://placekitten.com/200/200",
        username: "minh dong",
    }
console.log("oject: "+owner);
    return (
        <ul>
            <li className="space" onClick = {()=>{loadPosts(currentViewAddress)}}><Link to="/newsfeed" style = {{color : "red"}}> Posts</Link></li>
            <li ><Link to="/followers" style = {{color : "red"}}>Followers</Link></li> 
            <li  onClick={(e) => {onFollowClick(e, owner);}}><Link to="/" style = {{color : "red"}}>Follow
            </Link></li>
            <li ><Link to="/" style = {{color : "black"}}>Likes</Link></li>
            <li ><Link to="/" style = {{color : "black"}}>Lists</Link></li>
            <li ><Link to="/" style = {{color : "black"}}>Moments</Link></li>
        </ul>
        
    )
}
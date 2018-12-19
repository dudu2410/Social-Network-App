import React, { Component } from 'react'
import '../Css/Semi-Header.css'

export const SemiHeader = (isFollow,followers) => {
    return (
        <ul>
            <li className="space"><a>Posts</a></li>
           <li><a  href="/followers">Followers</a></li> 
            <li><a>Follow</a></li>
            <li><a>Likes</a></li>
            <li><a>Lists</a></li>
            <li><a>Moments</a></li>
        </ul>
    )
}
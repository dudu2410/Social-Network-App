import React, { Component } from 'react'
import '../Css/Semi-Header.css'

export const SemiHeader = () => {
    return (
        <ul>
            <li className="space"><a>Posts</a></li>
            <li><a>Following</a></li>
            <li><a>Followers</a></li>
            <li><a>Likes</a></li>
            <li><a>Lists</a></li>
            <li><a>Moments</a></li>
        </ul>
    )
}
import React, { Component } from 'react'
import '../Css/Wall.css'

export const Wall = () => {
    return (
        <div>
            <div className="Img_Wall">
                <img></img>
            </div>
            <div className="avatar_div">
                <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/russel.jpg" />
                <div className="hover">
                    <div className="icon-twitter" />
                </div>
                </div>
            </div>
        </div>
    )
}
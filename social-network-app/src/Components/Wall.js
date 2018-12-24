import React from 'react'
import '../Css/Wall.css'
import FollowContainer from '.././Containers/FollowContainer';

export const Wall = () => {
    return (
        <div>
            <div className="Img_Wall">
                <img src="https://coverfiles.alphacoders.com/508/50802.jpg" alt=""></img>
            </div>
            <FollowContainer/>
            <div className="avatar_div">
                <div className="avatar">
                <img src="http://www.croop.cl/UI/twitter/images/russel.jpg" alt=""/>
                <div className="hover">
                    <div className="icon-twitter" />
                </div>
                </div>
            </div>
        </div>
    )
}
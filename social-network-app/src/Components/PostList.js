import React from 'react'
import { Post } from '../Components/Post'
import '../Css/PostList.css'


export const PostList = ({ posts, currentViewUserInfo }) => {
    if (posts === undefined) {
        return (
            <div className='container loader-container'>
                <div className="loader big-loader"/>
            </div>
        );
    }
    return (
        <div className="postlist">
            <ul className="background_postlist">
                {posts.map((post, index) => (
                    <Post key={post.id} post = {post} userInfo={currentViewUserInfo}/>
                ))}
            </ul>
        </div>
    );
}

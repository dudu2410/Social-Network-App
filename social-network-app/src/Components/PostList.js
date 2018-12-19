import React from 'react'
import { Post } from '../Components/Post'
import '../Css/PostList.css'


export const PostList = ({ posts }) => {
    //console.log(posts);
    return (
        <div className="background">
            <ul>
                {posts.map((post, index) => (
                    <Post key={post.id} id={post.id} avatar={post.avatar} username={post.username}
                        content={post.content} comment={post.comment} share={post.share}
                        heart={post.heart} time_stamp={post.timestamp} />
                ))}
            </ul>
        </div>
        );
}

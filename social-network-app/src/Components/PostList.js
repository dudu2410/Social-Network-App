import React from 'react'
import { Post } from '../Components/Post'
import '../Css/PostList.css'


export const PostList = ({ posts }) => {
    console.log("danh sach post"  +posts);
    if (posts === undefined) {
        return (
            <div className="background">
            </div>
        );
    }
    return (
        <div className="background">
            <ul>
                {posts.map((post, index) => (
                    <Post key={post.id} post = {post} />
                ))}
            </ul>
        </div>
    );
}

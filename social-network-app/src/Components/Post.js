import React from 'react'
import '../Css/Post.css'
import {TextContent} from './TextContent'
import {UpdateAccountContent} from './UpdateAccountContent'
export const Post = ({post}) => {
  var postContent;
  switch (post.type){
    case  'post':
    {
      postContent = <TextContent content={post.content} contentType = {post.content_type}/>
      break;
    }
    case 'update_account':
    {
      postContent = <UpdateAccountContent content={post.content} contentType = {post.content_type}/>
      break;
    }
    default:
    {
      postContent = <div/>
      break;
    }

  }
  return (
    <div id={post.id} className="space-top">
      <div className="tweetEntry-tweetHolder">
        <div className="tweetEntry">
          <div className="tweetEntry-content">
            <a className="tweetEntry-account-group" href="[accountURL]">
              <img className="tweetEntry-avatar" src="http://placekitten.com/200/200" alt="" />
              <strong className="tweetEntry-fullname">
                {post.username} <img src="./../Social-Network-App/social-network-app/src/Icons/check.png" alt="" className="icon_check" />
              </strong>
              <span className="tweetEntry-username">
                @<b>{post.username}</b>
              </span>
            </a>
            <div className="tweetEntry-text-container">{postContent}</div>
          </div>
          <div className="tweetEntry-action-list" style={{ lineHeight: '24px', color: '#b1bbc3' }}>
            <i className="fa fa-reply" style={{ width: '80px', padding: '0 5px 0 5px' }}> Reply: {post.comment}</i>
            <i className="fa fa-retweet" style={{ width: '80px', padding: '0 5px 0 5px' }}>Share: {post.share}</i>
            <i className="fa fa-heart" style={{ width: '80px', padding: '0 5px 0 5px' }}>♡: {post.heart}</i>
          </div>
        </div>
      </div>
      {/*End of tweetHolder*/}
    </div>
  )
}

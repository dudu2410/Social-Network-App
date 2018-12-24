import React from 'react'
import '../Css/Post.css'
import { TextContent } from './TextContent'
import { UpdateAccountContent } from './UpdateAccountContent'
import { PaymentContent } from './PaymentContent'

export const Post = ({ post, userInfo }) => {
  var postContent;
  switch (post.type) {
    case 'post':
      {
        postContent = <TextContent content={post.content} contentType={post.content_type} />
        break;
      }
    case 'update_account':
      {
        postContent = <UpdateAccountContent content={post.content} contentType={post.content_type} />
        break;
      }
    case 'payment':
      {
        console.log(post);
        postContent = <PaymentContent content={post.content} contentType={post.content_type} from={post.from} current_view_address={post.current_view_address} />
        break;
      }
    default:
      {
        postContent = <div />
        break;
      }
  }
  var usernameTag = <div className='loader small-loader tweetEntry-fullname' />
  var imgTag = <div className='loader small-loader tweetEntry-avatar' />
  if (userInfo !== undefined) {
    var imgPrefix = userInfo.avatar.includes('data') ? '' : 'data:image/jpeg;base64,';
    usernameTag = userInfo.username;
    imgTag = <img className="tweetEntry-avatar" src={imgPrefix + userInfo.avatar} alt="" /> 
  }

  return (
    <div id={post.id} className="space-top">
      <div className="tweetEntry-tweetHolder">
        <div className="tweetEntry">
          <div className="tweetEntry-content">
            <a className="tweetEntry-account-group" href="[accountURL]">
              {imgTag}
              <strong className="tweetEntry-fullname">
                {usernameTag} <img src="./../Social-Network-App/social-network-app/src/Icons/check.png" alt="" className="icon_check" />
              </strong>
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

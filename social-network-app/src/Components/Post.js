import React, { Component } from 'react'
import '../Css/Post.css'

export const Post = ({ id, avatar, username, time_stamp, content, heart, comment, share }) => {

  return (
    <div id={id} className="space-top">
      <div className="tweetEntry-tweetHolder">
        <div className="tweetEntry">
          <div className="tweetEntry-content">
            <a className="tweetEntry-account-group" href="[accountURL]">
              <img className="tweetEntry-avatar" src="http://placekitten.com/200/200" alt="" />
              <strong className="tweetEntry-fullname">
                {username} <img src="./../Social-Network-App/social-network-app/src/Icons/check.png" alt="" className="icon_check" />
              </strong>
              <span className="tweetEntry-username">
                @<b>{username}</b>
              </span>
              <span className="tweetEntry-timestamp">{time_stamp}</span>
            </a>
            <div className="tweetEntry-text-container">{content}</div>
          </div>
          <div className="tweetEntry-action-list" style={{ lineHeight: '24px', color: '#b1bbc3' }}>
            <i className="fa fa-reply" style={{ width: '80px', padding: '0 5px 0 5px' }}> Reply: {comment}</i>
            <i className="fa fa-retweet" style={{ width: '80px', padding: '0 5px 0 5px' }}>Share: {share}</i>
            <i className="fa fa-heart" style={{ width: '80px', padding: '0 5px 0 5px' }}>♡: {heart}</i>
          </div>
        </div>
      </div>
      {/*End of tweetHolder*/}
    </div>
  )
}

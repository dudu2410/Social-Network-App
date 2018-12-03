import React, { Component } from 'react'
import '../Css/Post.css'

export default class Post extends Component {
    render() {
        return(
            <div>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
          <title>Document</title>
          <div className="tweetEntry-tweetHolder">
            <div className="tweetEntry">
              <div className="tweetEntry-content">
                <a className="tweetEntry-account-group" href="[accountURL]">
                  <img className="tweetEntry-avatar" src="http://placekitten.com/200/200" alt=""/>
                  <strong className="tweetEntry-fullname">
                    YouTube <img src="./../Social-Network-App/social-network-app/src/Icons/check.png" alt="" className="icon_check" />
                  </strong>
                  <span className="tweetEntry-username">
                    @<b>YouTube</b>
                  </span>
                  <span className="tweetEntry-timestamp">- Nov 30</span>
                </a>
                <div className="tweetEntry-text-container">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quam ipsum, finibus ac est sed, vestibulum condimentum neque. Sed eget iaculis.
                </div>
              </div>
              <div className="border_optionalMedia">
                <div className="optionalMedia">
                  <img className="optionalMedia-img" alt="" src="http://placekitten.com/500/400" />
                </div>
                <div className="details">
                  Help @marshmellomusic help 🐶🐩🐕! <br />
                  <br />
                  Click the "donate" button to the right of his video to make a donation to @HopeForPaws animal rescue: https://youtu.be/cPyArmc7KWk . #YouTubeGiving
                </div>
              </div>
              <div className="tweetEntry-action-list" style={{lineHeight: '24px', color: '#b1bbc3'}}>
                <i className="fa fa-reply" style={{width: '80px'}}> ♡ 1,153k Likes</i>
                <i className="fa fa-retweet" style={{width: '80px'}}>♡ 1,153k Likes</i>
                <i className="fa fa-heart" style={{width: '80px'}}>♡ 1,153k Likes</i>
              </div>
            </div>
          </div>
          {/*End of tweetHolder*/}
        </div>
        )
    }
}
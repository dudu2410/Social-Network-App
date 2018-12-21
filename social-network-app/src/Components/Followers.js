import React, { Component } from 'react'
import '.././Css/App.css'

const Followers = ({current_user, loadFollowers,followers}) => {
    loadFollowers(followers);

  return (
    <div className="background">
    <ul className="list-group">
    {followers.map((follower) => (
      <li className="list-group-item" key = {follower.id}>{follower.username}</li>
                    ))}
            </ul>
        </div>
  )
}

export default Followers;
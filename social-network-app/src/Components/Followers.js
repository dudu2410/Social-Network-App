import React, { Component } from 'react'
import '.././Css/App.css'

const Followers = ({ followers }) => {
    console.log(followers);
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
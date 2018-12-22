import React, { Component } from 'react'
import '.././Css/App.css'
console.log("4.vo followers");

const Followers = ({followers}) => {
  console.log("danh sanh tv "+ followers);
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
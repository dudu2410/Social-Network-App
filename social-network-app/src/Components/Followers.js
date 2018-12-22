import React, { Component } from 'react'
import '.././Css/App.css'
console.log("4.vo followers");

const Followers = ({followers}) => {
  console.log("danh sanh tv "+ followers);
  return (
    <div className="background">
    <ul className="list-group">
    {followers.map((follower) => (
      <li className="list-group-item" key = {follower.id}><a href="/" style = {{color : "red"}}>
      <img src='https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/20883051_1838227159796757_3354415150688791402_n.jpg?_nc_cat=108&_nc_ht=scontent.fsgn2-3.fna&oh=bbb0cf33a38f7482fb6550d5d315191f&oe=5C9E33F4' 
      className="img-circle" alt={follower.username} style={{width:'20%'}} ></img>
      {follower.username}
      </a>
      </li>
                    ))}
            </ul>
        </div>
  )
}

export default Followers;
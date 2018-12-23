import React, { Component } from 'react'
import '.././Css/App.css'
import {changeCurrentViewUser} from '../Actions/Actions'
import  store from '../Store/MainStore'
console.log("4.vo followers");

const Followers = ({followers}) => {
  console.log("danh sanh tv "+ followers[0].key);
  return (
    <div className="background">
    <h4><b>People</b></h4>
    <br/>
    <table class="table table-borderless">
  <tbody>
    {followers.map((follower) => (
      <tr>
      <a href= '/' style = {{color : "black"}} onClick = {()=>{store.dispatch(changeCurrentViewUser(`${follower.key}`));
      console.log("thuc hien ham chuyen doi user");}}>
      <img src= {follower.avatar} 
      className="img-circle" alt={follower.username} style={{width:'50' ,height:'50'}} ></img>
      &emsp; {follower.username}
      </a>
      <br/>
    </tr>))}

  </tbody>
</table>
        </div>
  )
}

export default Followers;
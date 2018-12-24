import React from 'react'
import '.././Css/App.css'
import {changeCurrentViewUser} from '../Actions/Actions'
import  store from '../Store/MainStore'
import { Link } from 'react-router-dom'
console.log("4.vo followers");

const Followers = ({followers}) => {
  console.log("danh sanh tv "+ followers);
  return (
    <div className="background">
    <h4><b>People</b></h4>
    <br/>
    <table className="table table-borderless">
  <tbody>
    {followers.map((follower) => (
      <tr key ={follower.key}>
      <td><Link to="/" style = {{color : "black"}} onClick = {()=>{store.dispatch(changeCurrentViewUser(`${follower.key}`));
      console.log("thuc hien ham chuyen doi user");}}>
      <img src= {follower.avatar} 
      className="img-circle" alt={follower.username} style={{width:'50' ,height:'50'}} ></img>
      &emsp; {follower.username}
      </Link></td>
    </tr>))}

  </tbody>
</table>
        </div>
  )
}

export default Followers;
import React, { Component } from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import FollowersContainer from '../Containers/FollowersContainer';
import { Wall } from './Wall';
import '../Css/App.css'
console.log("2.vo following app");
const FollowingApp = ({ current_user, loadFollowers }) => {
    console.log("flong app "+ current_user + loadFollowers);
    loadFollowers(current_user);
  return (
    <div className="background">
      <AppNavBar />
      <Wall />
      <div className="container">
        <FollowersContainer />
      </div>
    </div>
  );
}

export default FollowingApp;


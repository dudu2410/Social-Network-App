import React, { Component } from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import PostListContainer from '../Containers/PostListContainer';
import { Wall } from './Wall';
import '../Css/App.css'
console.log("2.vo  app");
export const App = ({ current_user, loadPosts }) => {
  console.log("curent user la:" + current_user);
  loadPosts(current_user);
  return (
    <div className="background">
      <AppNavBar />
      <Wall />
      <div className="container">
        <PostListContainer />
      </div>
    </div>
  );
}


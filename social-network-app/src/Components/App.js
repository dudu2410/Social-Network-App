import React from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import PostListContainer from '../Containers/PostListContainer';
import Wall  from './Wall';
import '../Css/App.css'
import { Redirect } from 'react-router';
console.log("2.vo  app");
export const App = ({ currentViewAddress, loadPosts, loadNewsFeed,isNewFeed }) => {
  
  if (localStorage.privatekey){
    console.log("curent user la:" + currentViewAddress);
    if(isNewFeed)
    loadNewsFeed(currentViewAddress);
    else
    loadPosts(currentViewAddress);
    
    return (    
      <div className="background">
        <AppNavBar />
        <Wall/>
        <div className="container">
          <PostListContainer />
        </div>
      </div>
    );
  }else{
    return(
      <Redirect to="/login"/>
    )
  }
}


import React from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import PostListContainer from '../Containers/PostListContainer';
import Wall  from './Wall';
import '../Css/App.css'
import { Redirect } from 'react-router';
console.log("2.vo  app");
export const App = ({ currentViewAddress, loadPosts }) => {
  
  if (localStorage.privatekey){
    console.log("curent user la:" + currentViewAddress);
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


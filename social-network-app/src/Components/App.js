import React from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import PostListContainer from '../Containers/PostListContainer';
import { Wall } from './Wall';
import '../Css/App.css'
import { Redirect } from 'react-router';
console.log("2.vo  app");
export const App = ({ current_user, loadPosts }) => {
  
  if (localStorage.privatekey){
    console.log("curent user la:" + current_user);
    loadPosts(current_user);  
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


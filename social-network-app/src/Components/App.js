import React from 'react';
import AppNavBar from '../Containers/HeaderContainer';
import PostListContainer from '../Containers/PostListContainer';
import Wall  from './Wall';
import UserInfor  from './UserInfor';
import '../Css/App.css'
import { Redirect } from 'react-router';
console.log("2.vo  app");
export const App = ({ currentViewAddress, loadPosts }) => {
  
  if (localStorage.privatekey){
    console.log("curent user la:" + currentViewAddress);
    loadPosts(currentViewAddress);
    return (
      <div className="background">
        <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossOrigin="anonymous" />        
        </head>
        <AppNavBar />
        <Wall/>
        <div className="float_left">
          <UserInfor/>
        </div>
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


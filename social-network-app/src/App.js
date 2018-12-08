import React, { Component } from 'react';
import AppNavBar from './Containers/HeaderContainer';
import PostListContainer from './Containers/PostListContainer';
import { Wall } from './Components/Wall';
import './Css/App.css'

class App extends Component {
  render() {
    return (
      <div className="background">
        <AppNavBar />
        <Wall></Wall>
        <div className="container">
          <PostListContainer />
        </div>
      </div>
    );
  }
}

export default App;

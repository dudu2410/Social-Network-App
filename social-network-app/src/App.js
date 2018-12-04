import React, { Component } from 'react';
import AppNavBar from './Containers/HeaderContainer';
import PostListContainer from './Containers/PostListContainer';
import { Wall } from './Components/Wall';

class App extends Component {
  render() {
    return (
      <div>
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

import React, { Component } from 'react';
import AppNavBar from './Containers/HeaderContainer';
import PostListContainer from './Containers/PostListContainer';

class App extends Component {
  render() {
    return (
      <div>
        <AppNavBar />
        <div className="container">
          <PostListContainer />
        </div>
      </div>
    );
  }
}

export default App;

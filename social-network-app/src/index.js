import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import postlist from './Containers/PostListContainer'
import  store from './Store/MainStore'
import header from './Containers/HeaderContainer'
import App from './App'
// const Header = lazy(() => import('./Components/Header.js'));

import { Wall } from './Components/Wall'

const Index = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/home" component={App} />
          <Route path="/wall" component={Wall} />
        </Switch>
      </Suspense>
    </Router>
  </Provider>
);

ReactDOM.render(<Index />, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
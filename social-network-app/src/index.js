import React, { Suspense } from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import  store from './Store/MainStore'
import AppCont from './Containers/AppContainer'
import { Wall } from './Components/Wall'
import {changeCurrentViewUser} from './Actions/Actions'
import { LoginPage } from './Containers/LoginPage'


store.dispatch(changeCurrentViewUser('GDMNG3PLGUMPHXPPMRZ7EQRMT34F4JU6574OZIQL3LIK5P76CVW5QMTL'));

const Index = () => (
  <Provider store={store}>
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={AppCont} />
          <Route path="/home" component={AppCont} />
          <Route path="/wall" component={Wall} />
          <Route path="/login" component={LoginPage} />
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
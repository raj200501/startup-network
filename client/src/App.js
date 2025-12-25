import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Alert from './components/alerts/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Posts from './components/posts/PostList';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Alert />
        <Route exact path="/" component={Posts} />
        <section className="container">
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/posts" component={Posts} />
            <Route exact path="/dashboard" component={Posts} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;

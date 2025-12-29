import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/alerts/Alert';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Posts from './components/posts/PostList';
import Landing from './pages/Landing';
import AppHome from './pages/AppHome';
import Styleguide from './pages/Styleguide';
import KnowledgeBase from './pages/KnowledgeBase';
import LaunchPlan from './pages/LaunchPlan';
import Insights from './pages/Insights';
import { ToastProvider } from './ui';

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
      <ToastProvider>
        <Router>
          <div className="app-shell">
            <Navbar />
            <Alert />
            <main className="app-content">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/app" component={AppHome} />
                <Route exact path="/dashboard" component={AppHome} />
                <Route exact path="/styleguide" component={Styleguide} />
                <Route exact path="/knowledge" component={KnowledgeBase} />
                <Route exact path="/launch-plan" component={LaunchPlan} />
                <Route exact path="/insights" component={Insights} />
                <Route
                  render={() => (
                    <div className="container">
                      <h2>Page not found</h2>
                      <p className="lead">The page you are looking for does not exist.</p>
                    </div>
                  )}
                />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </Provider>
  );
};

export default App;

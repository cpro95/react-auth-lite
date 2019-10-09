import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// components
import BasicLayout from './BasicLayout';

// pages
import Error from '../pages/error';
import Login from '../pages/login';
import Register from '../pages/register';

export default function App() {
  const auth = useSelector(state => state.auth);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute auth={auth} path="/app" component={BasicLayout} />
        <PublicRoute auth={auth} path="/login" component={Login} />
        <PublicRoute auth={auth} path="/register" component={Register} />
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

// #######################################################################

function PrivateRoute({ component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated && auth.user.activated ? (
          React.createElement(component, props)
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: {
                from: props.location
              }
            }}
          />
        )
      }
    />
  );
}

function PublicRoute({ component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        auth.isAuthenticated && auth.user.activated ? (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        ) : (
          React.createElement(component, props)
        )
      }
    />
  );
}

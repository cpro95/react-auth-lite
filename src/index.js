import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import './index.css';
import * as serviceWorker from './serviceWorker';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // if (!localStorage.jwtToken.contains('undefined')) {
  //Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // Decode token and get user.info and exp
  const decoded = jwt_decode(token);

  // Error checking jwt decoded
  if (typeof decoded === Error) {
    localStorage.removeItem('jwtToken');
  } else {
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));
  }

  // Check for expred token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = './login';
  }
  // }
}
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

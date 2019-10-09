import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  ui: uiReducer
});

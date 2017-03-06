// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import settings from './settings';
import listening_history from './listening_history';

const rootReducer = combineReducers({
  settings,
  routing
});

export default rootReducer;

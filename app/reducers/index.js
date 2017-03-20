// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import settings from './settings';
import pay_history from './pay_history';
import song_list from './song_list';

const rootReducer = combineReducers({
  settings,
  pay_history,
  song_list,
  routing
});

export default rootReducer;

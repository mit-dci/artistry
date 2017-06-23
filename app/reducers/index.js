// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import settings from './settings';
import pay_history from './pay_history';
import song_list from './song_list';
import image_paths from './image_paths';

const rootReducer = combineReducers({
  settings,
  pay_history,
  song_list,
  image_paths,
  routing
});

export default rootReducer;

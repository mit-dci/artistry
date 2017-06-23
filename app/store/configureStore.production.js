// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist';


const router = routerMiddleware(hashHistory);
//const enhancer = applyMiddleware(thunk, router);
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router),
  autoRehydrate()
);

export default function configureStore(initialState?: settingsStateType) {
  store = createStore(rootReducer, initialState, enhancer); // eslint-disable-line
  persistStore(store);
  return store;
}

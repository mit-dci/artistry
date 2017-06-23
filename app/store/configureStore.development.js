import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import { persistStore, autoRehydrate } from 'redux-persist';

//import * as settingsActions from '../actions/settings';
import * as actions from '../actions/actions';



const actionCreators = Object.assign({}, actions, {push});
/*
const actionCreators = {
    ...actions,
    push,
};

const actionCreators = {
  ...settingsActions,
  push,
};
*/

const logger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger),
  autoRehydrate()
);

export default function configureStore(initialState?: settingsStateType) {
  const store = createStore(rootReducer, initialState, enhancer);
  persistStore(store);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}

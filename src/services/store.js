import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { createLogger } from 'redux-logger';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from './reducers';

// A nice helper to tell us if we're on the server
export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default (url = '/') => {
  // Create a history depending on the environment
  const history = isServer
    ? createMemoryHistory({
      initialEntries: [url],
    })
    : createBrowserHistory();

  const enhancers = [];
  const middlewares = [
    thunk,
    routerMiddleware(history),
    promiseMiddleware(), // resolves promises
    loadingBarMiddleware(), // manages loading bar
  ];

  if (process.env.NODE_ENV === 'development' && !isServer) {
    // log actions in console
    // middlewares.push(createLogger());

    // Dev tools are helpful
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middlewares),
    ...enhancers
  );

  // Do we have preloaded state available? Great, save it.

  const initialState = !isServer
    ? {
      agent: { userAgent: window.navigator.userAgent },
      ...window.__PRELOADED_STATE__,
    }
    : {};

  // Delete it once we have it stored in a variable, Set userAgent on client side
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }

  // Create the store
  const store = createStore(
    connectRouter(history)(reducers),
    initialState,
    composedEnhancers
  );

  return {
    store,
    history,
  };
};

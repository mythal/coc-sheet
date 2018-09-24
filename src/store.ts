import {applyMiddleware, createStore, Middleware} from 'redux';
import { sheet } from './reducers';


const logger: Middleware = store => next => action => {
  console.group(action.type);
  console.info(action);
  let result = next(action);
  // console.log('next state', store.getState());
  console.groupEnd();
  return result
};


export const store = createStore(
  sheet,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(logger),
);

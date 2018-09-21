import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './components/App';
import './index.css';
import {createStore} from 'redux';
import {sheet} from "./reducers";
import {Provider} from 'react-redux';

const store = createStore(
  sheet,
  {note: ""},
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

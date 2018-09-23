import {createStore} from "redux";
import {sheet} from "./reducers";

export const store = createStore(
  sheet,
  {note: ""},
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

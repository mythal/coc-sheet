import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as enzyme from 'enzyme';

import { App } from "./App";
import { store } from "../store";
import { Provider } from "react-redux";


it('render app', () => {
  enzyme.shallow(<App />);
});


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

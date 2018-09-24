import * as React from 'react';
import * as enzyme from 'enzyme';

import { App } from "./App";


it('render app', () => {
  enzyme.shallow(<App/>);
});

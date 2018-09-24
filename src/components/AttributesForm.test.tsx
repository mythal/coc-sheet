import * as React from 'react';
import * as enzyme from 'enzyme';
import { AttributesForm } from "./AttributesForm";


it('attributes form app', () => {
  const form = enzyme
    .shallow(<AttributesForm attributes={{}} onEdited={() => {}}/>);
  expect(form);
});

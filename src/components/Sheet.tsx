import * as React from 'react';
import Note from './Note';
import InformationForm from './InformationForm';
import Attributes from "./AttributesForm";
import Log from "./Log";


const Sheet = () => {
  return (
    <div>
      <InformationForm />
      <Attributes />
      <Note />
      <Log />
    </div>
  );
};


export default Sheet;

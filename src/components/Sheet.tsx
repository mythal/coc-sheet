import * as React from 'react';
import Note from './Note';
import InformationForm from './InformationForm';
import Attributes from "./AttributesForm";


const Sheet = () => {
  return (
    <div>
      <InformationForm />
      <Attributes />
      <Note />
    </div>
  );
};


export default Sheet;

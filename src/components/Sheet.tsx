import * as React from 'react';
import Note from './Note';
import InformationForm from './InformationForm';
import Attributes from "./AttributesForm";
import Log from "./Log";
import { Grid } from "@material-ui/core";


const Sheet = () => {
  return (
    <Grid container spacing={16}>
      <Grid item md={8}>
        <InformationForm />
        <Attributes />
        <Note />
      </Grid>
      <Grid item md={4}>
        <Log />
      </Grid>

    </Grid>
  );
};


export default Sheet;

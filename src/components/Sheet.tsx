import * as React from 'react';
import Note from './Note';
import InformationForm from './InformationForm';
import Attributes from "./AttributesForm";
import Log from "./Log";
import { createStyles, Grid, Theme, withStyles } from "@material-ui/core";
import Occupations from "./OccupationForm";


const styles = ({spacing}: Theme) => createStyles({
  root: {
    padding: spacing.unit * 2,
  }
});

const Sheet = (props: {classes: {root: string}}) => {
  return (
    <Grid className={props.classes.root} container spacing={16}>
      <Grid item md={8}>
        <InformationForm />
        <Attributes />
        <Note />
        <Occupations/>
      </Grid>
      <Grid item md={4}>
        <Log />
      </Grid>

    </Grid>
  );
};


export default withStyles(styles)(Sheet);

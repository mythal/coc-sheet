import * as React from 'react';
import Note from './Note';
import InformationForm from './InformationForm';
import Attributes from "./AttributesForm";
import Log from "./Log";
import { createStyles, Grid, Theme, WithStyles, withStyles } from "@material-ui/core";
import Occupations from "./OccupationForm";
import BackstoryForm from "./BackstoryForm";
import Skills from "./Skills";


const styles = ({spacing}: Theme) => createStyles({
  root: {
    padding: spacing.unit * 2,
  }
});

const Sheet = (props: WithStyles<typeof styles>) => {
  return (
    <Grid className={props.classes.root} container>
      <Grid item md={8} lg={9} xl={10}>
        <InformationForm />
        <Attributes />
        <Occupations />
        <Skills />
        <BackstoryForm />
        <Note />
      </Grid>
      <Grid item md={4} lg={3} xl={2}>
        <Log />
      </Grid>

    </Grid>
  );
};


export default withStyles(styles)(Sheet);

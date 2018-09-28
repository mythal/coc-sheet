import * as React from 'react';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Sheet } from "../system/sheet";
import { Grid } from "@material-ui/core";
import { BACKSTORY, Backstory } from "../system/backstory";
import { editBackstory } from "../actions";
import { Input } from "./controls/Input";


interface Props {
  backstory: Backstory;
  change: (next: Partial<Backstory>) => void;
}


interface State {
}


class BackstoryForm extends React.Component<Props, State> {
  render() {
    const name = (name: keyof Backstory) => ({
      value: this.props.backstory[name],
      label: BACKSTORY[name],
      fullWidth: true,
      multiline: true,
      onEdited: (value: string) =>
        this.props.change({[name]: value})
    });

    return (
      <Grid container spacing={16}>
        <Grid xs={12} md={8} item><Input {...name("personalDescription")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("ideologyOrBeliefs")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("significantPeople")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("meaningfulLocations")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("treasuredPossessions")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("traits")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("injuriesAndScars")} /></Grid>
        <Grid xs={12} md={4} item><Input {...name("phobiasAndManias")} /></Grid>
      </Grid>
    );
  }
}


const mapStateToProps = (state: Sheet): Pick<Props, 'backstory'> => ({backstory: state.backstory});


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'change'> =>
  ({change: next => dispatch(editBackstory(next))});


export default connect(mapStateToProps, mapDispatchToProps)(BackstoryForm);

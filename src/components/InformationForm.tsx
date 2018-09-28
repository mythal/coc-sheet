import * as React from 'react';
import { Dispatch } from 'redux';

import { Information } from '../system/information';
import { Input } from './controls/Input';
import { connect } from 'react-redux';
import { editInformation } from '../actions';
import { Sheet } from "../system/sheet";
import { Grid } from "@material-ui/core";


interface Props {
  information: Information;
  edit: (next: Partial<Information>) => void;
}


const InformationForm = ({ information, edit }: Props) => {
  const name = (key: keyof Information) => ({
    value: information[key],
    onEdited: (text: string) => edit({ [key]: text })
  });
  return (
    <Grid container spacing={16}>
      <Grid item><Input label='名称' {...name('name')} /></Grid>
      <Grid item><Input label='玩家' {...name('player')} /></Grid>
      <Grid item><Input label='性别' {...name('sex')} /></Grid>
      <Grid item><Input label='居住地' {...name('residence')} /></Grid>
      <Grid item><Input label='出生地' {...name('birthplace')} /></Grid>
      <Grid item><Input label='时代' {...name('era')} /></Grid>
    </Grid>
  );
};


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'edit'> => {
  return ({ edit: next => dispatch(editInformation(next)) });
};

const mapStateToProps = (state: Sheet): Pick<Props, 'information'> => ({ information: state.information });


export default connect(mapStateToProps, mapDispatchToProps)(InformationForm);

import * as React from 'react';
import { Dispatch } from 'redux';

import { Information, Sheet } from '../types';
import { Input } from './controls/Input';
import { connect } from 'react-redux';
import { editInformation } from '../actions';
import { Number } from './controls/Number';
import { Button } from '@material-ui/core';


interface Props {
  information: Information;
  edit: (next: Information) => void;
}


const InformationForm = ({ information, edit }: Props) => {
  const name = (k: keyof Information) => ({
    value: information[k],
    onEdited: (text: string) => {
      let next = { ...information };
      next[k] = text;
      edit(next);
    }
  });
  return (
    <div>
      <Input label='名称' {...name('name')} />
      <Input label='玩家' {...name('player')} />
      <Input label='性别' {...name('sex')} />
      <Input label='职业' {...name('occupation')} />
      <div><Number label='年龄' /><Button variant='contained'>随机年龄</Button></div>
      <Input label='居住地' {...name('residence')} />
      <Input label='出生地' {...name('birthplace')} />
      <Input label='时代' {...name('era')} />
    </div>
  );
};


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'edit'> => {
  return ({ edit: next => dispatch(editInformation(next)) });
};

const mapStateToProps = (state: Sheet): Pick<Props, 'information'> => ({ information: state.information });


export default connect(mapStateToProps, mapDispatchToProps)(InformationForm);

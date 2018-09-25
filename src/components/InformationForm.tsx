import * as React from 'react';
import { Dispatch } from 'redux';

import { Information } from '../system/information';
import { Input } from './controls/Input';
import { connect } from 'react-redux';
import { editInformation } from '../actions';
import { Sheet } from "../system/sheet";


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
    <div>
      <Input label='名称' {...name('name')} />
      <Input label='玩家' {...name('player')} />
      <Input label='性别' {...name('sex')} />
      <Input label='职业' {...name('occupation')} />
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

import * as React from 'react';
import { connect } from 'react-redux';
import { Sheet } from '../system/sheet';
import * as actions from '../actions';
import { Dispatch } from 'redux';
import { Input } from './controls/Input'


interface Props {
  value: string;
  onChange: (text: string) => void;
}


const Note = ({ value, onChange }: Props) => {
  return (
    <Input label='调查员笔记' value={value} onEdited={onChange} multiline />
  );
};


const mapStateToProps = ({ note }: Sheet) => ({ value: note });


const mapDispatchToProps = (dispatch: Dispatch): Pick<Props, 'onChange'> => {
  return ({ onChange: (text: string) => dispatch(actions.editNote(text)) });
};


export default connect(mapStateToProps, mapDispatchToProps)(Note);

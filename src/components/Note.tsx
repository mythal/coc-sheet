import * as React from 'react';
import { connect } from "react-redux";
import { SheetState } from "../types";
import * as actions from '../actions';
import { Dispatch } from "redux";
import { Input } from "./controls/Input";


interface Props {
  value: string;
  onChange: (text: string) => void;
}


const Note = ({ value, onChange }: Props) => {
  return (
    <Input value={value} onEdited={onChange} delay />
  );
};


const mapStateToProps = ({ note }: SheetState) => ({ value: note });


const mapDispatchToProps = (dispatch: Dispatch): Partial<Props> => {
  return ({ onChange: (text: string) => dispatch(actions.editNote(text)) });
};


export default connect(mapStateToProps, mapDispatchToProps)(Note);

import * as React from 'react';
import Note from './Note';
import {SheetState} from "../types";
import {connect} from "react-redux";


interface Props {
  name: string;
}

const Sheet = ({name}: Props) => {
  return (<div><p>Hello, {name}</p><Note/></div>);
};


const mapStateToProps = ({note}: SheetState) => ({name: note});


export default connect(mapStateToProps)(Sheet);

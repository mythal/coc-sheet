import { EditNote } from '../actions';
import { EDIT_NOTE } from '../constants';
import { Sheet } from '../system/sheet';
import { combineReducers } from 'redux';
import { information } from "./information";
import { stats } from "./stats";
import { backstory } from "./backstory";
import { logs } from "./logs";
import { occupation } from "./occupation";


function note(state: string = '', action: EditNote) {
  if (action.type === EDIT_NOTE)
    return action.note;
  else
    return state;
}


export const sheet = combineReducers<Sheet>(
  { note, information, stats, backstory, logs, occupation }
);

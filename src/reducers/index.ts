import { EditNote } from '../actions';
import { EDIT_NOTE } from '../constants';
import { Sheet } from '../system/sheet';
import { combineReducers } from 'redux';
import { information } from "./information";
import { attributes } from "./attributes";
import { backstory } from "./backstory";
import { logs } from "./logs";


function note(state: string = '', action: EditNote) {
  if (action.type === EDIT_NOTE)
    return action.note;
  else
    return state;
}


export const sheet = combineReducers<Sheet>(
  { note, information, attributes, backstory, logs }
);

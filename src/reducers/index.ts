import { EditNote } from '../actions';
import { EDIT_NOTE } from '../constants';
import { SheetState } from '../types';
import { combineReducers } from 'redux';


function note(note: string = '', action: EditNote) {
  if (action.type === EDIT_NOTE)
    return action.note;
  else
    return note;
}


export const sheet = combineReducers<SheetState>({ note });

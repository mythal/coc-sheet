import { EditNote, EditInformation } from '../actions';
import { EDIT_NOTE, EDIT_INFORMATION } from '../constants';
import { Sheet, Information } from '../types';
import { combineReducers } from 'redux';
import { Attributes } from '../system/attributes';
import { Backstory } from '../system/backstory';


function note(state: string = '', action: EditNote) {
  if (action.type === EDIT_NOTE)
    return action.note;
  else
    return state;
}


function information(state: Information, action: EditInformation) {
  if (!state) return (
    {
      name: '',
      player: '',
      occupation: '',
      sex: '',
      residence: '',
      birthplace: '',
      era: ''
    }
  );
  if (action.type === EDIT_INFORMATION) return action.next;
  return state;
}


function attributes(state: Partial<Attributes> = {}) {
  return state;
}


function backstory(state: Backstory) {
  if (!state) return (
    {
      personalDescription: '',
      ideologyOrBeliefs: '',
      significantPeople: '',
      meaningfulLocations: '',
      treasuredPossessions: '',
      traits: ''
    }
  );
  return state;
}


export const sheet = combineReducers<Sheet>(
  { note, information, attributes, backstory }
);

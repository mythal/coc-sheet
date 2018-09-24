import { EditNote, EditInformation, EditAttribute } from '../actions';
import { EDIT_NOTE, EDIT_INFORMATION, EDIT_ATTRIBUTE } from '../constants';
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


const infoInit = {
  name: '',
  player: '',
  occupation: '',
  sex: '',
  residence: '',
  birthplace: '',
  era: ''
};

function information(state: Information = infoInit, action: EditInformation) {
  if (action.type === EDIT_INFORMATION) return action.next;
  return state;
}


function attributes(state: Partial<Attributes> = {}, action: EditAttribute) {
  if (action.type === EDIT_ATTRIBUTE)
    return { ...state, ...action.attr };
  return state;
}


const backstoryInit = {
  personalDescription: '',
  ideologyOrBeliefs: '',
  significantPeople: '',
  meaningfulLocations: '',
  treasuredPossessions: '',
  traits: ''
};


function backstory(state: Backstory = backstoryInit) {
  return state;
}


export const sheet = combineReducers<Sheet>(
  { note, information, attributes, backstory }
);

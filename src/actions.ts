import { EDIT_NOTE, EDIT_INFORMATION, EDIT_ATTRIBUTE } from './constants';
import { Information } from './types';
import { Attributes } from "./system/attributes";


export interface EditNote {
  type: typeof EDIT_NOTE;
  note: string;
}


export const editNote = (note: string): EditNote =>
  ({ type: EDIT_NOTE, note });


export interface EditInformation {
  type: typeof EDIT_INFORMATION;
  next: Information;
}


export const editInformation = (next: Information): EditInformation => {
  return { type: EDIT_INFORMATION, next: next };
};


export interface EditAttribute {
  type: typeof EDIT_ATTRIBUTE;
  attr: Partial<Attributes>;
}

export const editAttribute = (attr: Partial<Attributes>): EditAttribute => {
  return { type: EDIT_ATTRIBUTE, attr: attr }
};

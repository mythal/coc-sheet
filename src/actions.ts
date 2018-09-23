import { EDIT_NOTE, EDIT_INFORMATION } from './constants';
import { Information } from './types';


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


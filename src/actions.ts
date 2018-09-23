import * as constants from './constants'


export interface EditNote {
  type: typeof constants.EDIT_NOTE;
  note: string;
}


export function editNote(note: string): EditNote {
  return { type: constants.EDIT_NOTE, note }
}

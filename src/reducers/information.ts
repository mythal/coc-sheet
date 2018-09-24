import { Information } from "../system/information";
import { EditInformation } from "../actions";
import { EDIT_INFORMATION } from "../constants";


const init = {
  name: '',
  player: '',
  occupation: '',
  sex: '',
  residence: '',
  birthplace: '',
  era: ''
};

export function information(state: Information = init, action: EditInformation) {
  if (action.type === EDIT_INFORMATION) return { ...state, ...action.next };
  return state;
}

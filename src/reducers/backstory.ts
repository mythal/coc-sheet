import { Backstory } from "../system/backstory";
import { EditBackstory } from "../actions";
import { EDIT_BACKSTORY } from "../constants";

const initial = {
  personalDescription: '',
  ideologyOrBeliefs: '',
  significantPeople: '',
  meaningfulLocations: '',
  treasuredPossessions: '',
  traits: '',
  injuriesAndScars: '',
  phobiasAndManias: '',
};


export function backstory(state: Backstory = initial, action: EditBackstory) {
  if (action.type === EDIT_BACKSTORY) {
    return {...state, ...action.next};
  }
  return state;
}

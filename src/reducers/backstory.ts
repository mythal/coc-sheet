import { Backstory } from "../system/backstory";

const backstoryInit = {
  personalDescription: '',
  ideologyOrBeliefs: '',
  significantPeople: '',
  meaningfulLocations: '',
  treasuredPossessions: '',
  traits: ''
};


export function backstory(state: Backstory = backstoryInit) {
  return state;
}

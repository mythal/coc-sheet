import { Backstory } from "../system/backstory";

const initial = {
  personalDescription: '',
  ideologyOrBeliefs: '',
  significantPeople: '',
  meaningfulLocations: '',
  treasuredPossessions: '',
  traits: ''
};


export function backstory(state: Backstory = initial) {
  return state;
}

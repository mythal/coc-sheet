import { Occupation, occupations } from "../system/occupations";
import { EditOccupation } from "../actions";
import { EDIT_OCCUPATION } from "../constants";

export const occupation = (state: Occupation = occupations[0], action: EditOccupation) => {
  if (action.type === EDIT_OCCUPATION) {
    return action.occupation;
  }
  return state;
};

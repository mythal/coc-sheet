import { Stats } from "../system/stats";
import { EditStats } from "../actions";
import { EDIT_ATTRIBUTE } from "../constants";

export function stats(state: Partial<Stats> = {}, action: EditStats) {
  if (action.type === EDIT_ATTRIBUTE)
    return { ...state, ...action.next };
  return state;
}

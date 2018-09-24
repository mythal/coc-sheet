import { Attributes } from "../system/attributes";
import { EditAttribute } from "../actions";
import { EDIT_ATTRIBUTE } from "../constants";

export function attributes(state: Partial<Attributes> = {}, action: EditAttribute) {
  if (action.type === EDIT_ATTRIBUTE)
    return { ...state, ...action.attr };
  return state;
}

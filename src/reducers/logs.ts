import { Log} from "../actions";
import { LOG } from "../constants";
import { LogRecord } from "../system/logger";



export const logs = (state: Array<LogRecord> = [], action: Log) => {
  switch (action.type) {
    case LOG:
      const last = state.length - 1;
      if (last !== -1 && state[last].key === action.record.key && state[last].old != undefined) {
        let next = state.slice();
        next[last] = action.record;
        return next;
      }
      return state.concat([action.record]);
    default:
      return state;
  }
};

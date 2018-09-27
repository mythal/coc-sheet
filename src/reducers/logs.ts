import { Log} from "../actions";
import { LOG } from "../constants";
import { LogRecord } from "../system/logger";



export const logs = (state: Array<LogRecord> = [], action: Log) => {
  switch (action.type) {
    case LOG:
      const last = state.length - 1;
      const record = action.record;
      if (last !== -1 && state[last].key === record.key) {
        let next = state.slice();
        let prev = next[last];
        if (record.type === 'Modified' && prev.type === 'Modified') {
          record.old = prev.old;
          record.remarks = record.remarks.concat(prev.remarks);
        }
        record.count += prev.count;
        next[last] = record;
        return next;
      }
      return state.concat([record]);
    default:
      return state;
  }
};

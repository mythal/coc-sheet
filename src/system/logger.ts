interface Record {
  key: string;
  date: Date;
}


export interface Modified extends Record {
  type: 'Modified';
  display: string;
  old?: string;
  next: string;
  remark: string;
}

export const modifiedRecord = (key: string, display: string, next: any, old?: any, remark: string = "")
  : Modified => {
  const _next = String(next);
  const _old = old === undefined ? undefined : String(old);
  return { type: 'Modified', key, display, next: _next, old: _old, remark, date: new Date() };
};

export type LogRecord = Modified;

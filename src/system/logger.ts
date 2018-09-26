import { randomId } from "../utils";

export interface Modified {
  type: 'Modified';
  key: string;
  display: string;
  old?: string;
  next: string;
  remark: string;
  date: Date;

}

export const modifiedRecord = (key: string, display: string, next: any, old?: any, remark: string = "")
  : Modified => {
  const _next = String(next);
  const _old = old === undefined ? undefined : String(old);
  return { type: 'Modified', key, display, next: _next, old: _old, remark, date: new Date() };
};


export interface Info {
  type: 'Info';
  date: Date;
  message: string;
  key: string;
}

export const infoRecord = (message: string, key = randomId())
  : Info => ({ type: 'Info', date: new Date(), message, key});

export type LogRecord = Modified | Info;

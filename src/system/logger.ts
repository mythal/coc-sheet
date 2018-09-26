import { randomId } from "../utils";

export interface Modified {
  type: 'Modified';
  key: string;
  display: string;
  old?: number;
  next: number;
  remark: string;
  date: Date;
  count: number;

}

export const modifiedRecord = (key: string, display: string, next: number, old?: number, remark: string = "")
  : Modified => ({ type: 'Modified', key, display, next, old, remark, date: new Date(), count: 1 });


export interface Info {
  type: 'Info';
  date: Date;
  message: string;
  key: string;
  count: number;
}

export const infoRecord = (message: string, key = randomId())
  : Info => ({ type: 'Info', date: new Date(), message, key, count: 1});

export type LogRecord = Modified | Info;

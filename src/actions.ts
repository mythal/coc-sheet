import {
  AUTO_AGE,
  AUTO_ATTRIBUTE,
  EDIT_ATTRIBUTE,
  EDIT_BACKSTORY,
  EDIT_INFORMATION,
  EDIT_NOTE, EDIT_OCCUPATION,
  EDIT_SKILL,
  LOG,
  RECOVER_LUCK,
  SELECT_KEY_CONNECTION
} from './constants';
import { Information } from './system/information';
import { Attributes } from "./system/attributes";
import { Backstory } from "./system/backstory";
import { Skill } from "./system/skills";
import { LogRecord } from "./system/logger";
import { Occupation } from "./system/occupations";


export interface EditNote {
  type: typeof EDIT_NOTE;
  note: string;
}


export const editNote = (note: string): EditNote => ({ type: EDIT_NOTE, note });


export interface EditInformation {
  type: typeof EDIT_INFORMATION;
  next: Partial<Information>;
}


export const editInformation = (next: Partial<Information>): EditInformation => ({ type: EDIT_INFORMATION, next });


export interface EditAttribute {
  type: typeof EDIT_ATTRIBUTE;
  next: Partial<Attributes>;
}

export const editAttribute = (next: Partial<Attributes>)
  : EditAttribute => ({ type: EDIT_ATTRIBUTE, next });


export interface EditBackstory {
  type: typeof EDIT_BACKSTORY;
  next: Partial<Backstory>;
}


export const editBackstory = (next: Partial<Backstory>): EditBackstory => ({ type: EDIT_BACKSTORY, next });


export interface SelectKeyConnection {
  type: typeof SELECT_KEY_CONNECTION;
  key: keyof Backstory;
}

export const selectKeyConnection = (key: keyof Backstory): SelectKeyConnection =>
  ({ type: SELECT_KEY_CONNECTION, key });


export interface AutoAttribute {
  type: typeof AUTO_ATTRIBUTE;
  attributes: Partial<Attributes>;
}


export function autoAttribute(attributes: Partial<Attributes>): AutoAttribute {
  return { type: AUTO_ATTRIBUTE, attributes }
}

export interface AutoAge {
  type: typeof AUTO_AGE;
  age: number;
}


export function autoAge(age: number): AutoAge {
  return { type: AUTO_AGE, age };
}

export interface RecoverLuck {
  type: typeof RECOVER_LUCK;
  luck: number;
}


export function recoverLuck(luck: number): RecoverLuck {
  return { type: RECOVER_LUCK, luck };
}

export interface EditSkill {
  type: typeof EDIT_SKILL;
  skill: Skill;
}


export const editSkill = (skill: Skill): EditSkill => ({ type: EDIT_SKILL, skill });



export interface Log {
  type: typeof LOG;
  record: LogRecord;
}


export const logger = (record: LogRecord): Log => ({ type: LOG, record });


export interface EditOccupation {
  type: typeof EDIT_OCCUPATION;
  occupation: Occupation;
}

export const editOccupation = (occupation: Occupation): EditOccupation => ({type: EDIT_OCCUPATION, occupation});

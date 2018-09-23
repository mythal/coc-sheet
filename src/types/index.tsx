import { Attributes } from '../system/attributes';
import { Backstory } from '../system/backstory';

export interface Sheet {
  note: string;
  information: Information;
  attributes: Partial<Attributes>;
  backstory: Backstory;
}


export interface Information {
  name: string;
  player: string;
  occupation: string;
  sex: string;
  residence: string;
  birthplace: string;
  era: string;
}


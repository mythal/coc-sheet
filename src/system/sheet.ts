import { Attributes } from "./attributes";
import { Backstory } from "./backstory";
import { Information } from "./information";
import { LogRecord } from "./logger";
import { Occupation } from "./occupations";

export interface Sheet {
  note: string;
  information: Information;
  attributes: Partial<Attributes>;
  backstory: Backstory;
  occupation: Occupation;
  logs: Array<LogRecord>;
}

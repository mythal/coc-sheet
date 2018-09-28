import { Stats } from "./stats";
import { Backstory } from "./backstory";
import { Information } from "./information";
import { LogRecord } from "./logger";
import { Occupation } from "./occupations";

export interface Sheet {
  note: string;
  information: Information;
  stats: Partial<Stats>;
  backstory: Backstory;
  occupation: Occupation;
  logs: Array<LogRecord>;
}

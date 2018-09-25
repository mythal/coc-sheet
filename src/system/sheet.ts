import { Attributes } from "./attributes";
import { Backstory } from "./backstory";
import { Information } from "./information";
import { LogRecord } from "./logger";

export interface Sheet {
  note: string;
  information: Information;
  attributes: Partial<Attributes>;
  backstory: Backstory;
  logs: Array<LogRecord>;
}

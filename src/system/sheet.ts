import { Attributes } from "./attributes";
import { Backstory } from "./backstory";
import { Information } from "./information";

export interface Sheet {
  note: string;
  information: Information;
  attributes: Partial<Attributes>;
  backstory: Backstory;
}

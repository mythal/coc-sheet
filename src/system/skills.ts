import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";

const skillData = readFileSync('./data/skills.yaml', 'utf-8');

export interface Skill {
  label: string;
  name: string;
  initial: number | string | undefined;
  occupation?: number;
  interest?: number;
  growth?: number;
  contains?: Array<Skill>;
  tag?: Array<string>;
  deletable?: boolean;
}

export const skillList: Array<Skill> = (safeLoad(skillData) as Array<Skill>)
  .sort((a, b) => a.name.localeCompare(b.name));

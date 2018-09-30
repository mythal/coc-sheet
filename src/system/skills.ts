import { readFileSync } from "fs";
import { safeLoad } from "js-yaml";

const skillData = readFileSync('./data/skills.yaml', 'utf-8');

export interface Skill {
  label: string;
  name: string;
  initial: number | string | undefined;
  contains?: Array<Skill>;
  tag?: Array<string>;
  deletable?: boolean;
}

export const skillList = (safeLoad(skillData) as Array<Skill>)
  .sort((a, b) => a.name.localeCompare(b.name));

export const skillMap: {[key: string]: Skill} = (() => {
  let map = {};
  for (let skill of skillList) {
    map[skill.name] = skill;
  }
  return map;
})();

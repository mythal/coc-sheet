import skillData from '../data/skills.yaml';


export interface Skill {
  label: string;
  name: string;
  initial: number;
  contains?: Array<Skill>;
  tag?: Array<string>;
}

export const skills = skillData as Array<Skill>;

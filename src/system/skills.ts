import skillData from '../../data/skills.json';


export interface Skill {
  label: string;
  name: string;
  initial: number;
  contains?: Array<Skill>;
  tag?: Array<string>;
}

export const skills = skillData as Array<Skill>;

import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { Attributes } from './stats';
import { computeSkillPoint } from './interpreter';


const occupationData = readFileSync('./data/occupations.yaml', 'utf-8');

export interface Occupation {
  name: string;
  credit: [number, number];
  skills: string;
  skillPoint: string;
  description?: string;
}


export const occupations = safeLoad(occupationData) as Array<Occupation>;


export const occupationsSkillPoints = (attributes: Partial<Attributes>) => {
  return occupations.map(x => computeSkillPoint(attributes, x.skillPoint));
};

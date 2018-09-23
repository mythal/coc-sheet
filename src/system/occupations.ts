import occupationData from '../../data/occupations.json';
import { Attributes } from "./attributes";
import { computeSkillPoint } from "./interpreter";

export interface Occupation {
  name: string;
  credit: [number, number];
  skills: string;
  skillPoint: string;
  description?: string;
}


export const occupations = occupationData as Array<Occupation>;


export const occupationsSkillPoints = (attributes: Partial<Attributes>) => {
  return occupations.map(x => computeSkillPoint(attributes, x.skillPoint));
};

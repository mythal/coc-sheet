import occupationData from '../data/occupations.yaml';

export interface Occupation {
  name: string;
  credit: [number, number];
  skills: string;
  skillPoint: string;
  description?: string;
}


export const occupations = occupationData as Array<Occupation>;

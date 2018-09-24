import { computeSkillPoint } from './interpreter';
import { autoAttributes } from './attributes';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { Occupation } from "./occupations";


const file = fs.readFileSync('./data/occupations.yaml', 'utf8');
const occupations = yaml.safeLoad(file) as Array<Occupation>;


it('compute skill point', () => {
  const result = occupations
    .map(occupation => computeSkillPoint(autoAttributes(), occupation.skillPoint))
    .filter(x => x === null || x < 50);
  expect(result).toEqual([]);
});

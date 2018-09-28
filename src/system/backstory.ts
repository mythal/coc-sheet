import { choice } from './roll';
import {
  CONSTELLATION,
  IDEOLOGY_OR_BELIEFS, MEANINGFUL_LOCATIONS,
  SIGNIFICANT_PEOPLE_WHO,
  SIGNIFICANT_PEOPLE_WHY, TRAITS,
  TREASURED_POSSESSIONS
} from "../text/zh-Hans";
export {BACKSTORY} from "../text/zh-Hans";


export interface Backstory {
  personalDescription: string;
  ideologyOrBeliefs: string;
  significantPeople: string;
  meaningfulLocations: string;
  treasuredPossessions: string;
  traits: string;
  injuriesAndScars: string;
  phobiasAndManias: string;
}


export const backStoryHint: { [type: string]: (type: string) => string } = {
  'personalDescription': () => {
    const blood_types = choice(['A', 'B', 'AB', 'O']);
    const mbti = [['E', 'I'], ['S', 'N'], ['T', 'F'], ['J', 'P']].map(choice).join('');
    const constellation = choice(CONSTELLATION);
    return `${blood_types}型血 / MBTI人格类型：${mbti} / ${constellation}座`;
  },
  'ideologyOrBeliefs': () => choice(IDEOLOGY_OR_BELIEFS),
  'significantPeople': () => {
    return `${choice(SIGNIFICANT_PEOPLE_WHO)} 因为${choice(SIGNIFICANT_PEOPLE_WHY)}`;
  },
  'meaningfulLocations': () => choice(MEANINGFUL_LOCATIONS),
  'treasuredPossessions': () => choice(TREASURED_POSSESSIONS),
  'traits': () => choice(TRAITS),
};

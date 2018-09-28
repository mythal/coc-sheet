import { autoAttributes } from './stats';
import { occupationsSkillPoints } from "./occupations";



it('compute skill point', () => {
  for (let i = 0; i < 100; i++) {
    const result = occupationsSkillPoints(autoAttributes())
      .filter(x => x === null || x < 50);
    expect(result).toEqual([]);
  }
});

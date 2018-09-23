import { computeSkillPoint } from "./interpreter";
import { autoAttributes } from "./attributes";

it('compute skill point', () => {
  const result = [
    "EDU * 4",
    "EDU * 2 + DEX * 2",
    "EDU * 2 + STRorDEX * 2",
    "EDU * 2 + APPorDEXorSTR * 2",
  ].map(ptn => computeSkillPoint(autoAttributes(), ptn)).filter(x => x === null || x < 50);
  expect(result).toEqual([]);
});

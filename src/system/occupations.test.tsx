import { computeSkillPoint } from "./interpreter";
import { r } from "./roll";

it('compute skill point', () => {
  const result = [
    "EDU * 4",
    "EDU * 2 + DEX * 2",
    "EDU * 2 + STRorDEX * 2",
    "EDU * 2 + APPorDEXorSTR * 2",
  ].map(ptn => computeSkillPoint({
    str: 5 * r(3, 6),
    con: 5 * r(3, 6),
    siz: 5 * (r(2, 6) + 6),
    dex: 5 * r(3, 6),
    app: 5 * r(3, 6),
    int: 5 * (r(2, 6) + 6),
    pow: 5 * r(3, 6),
    edu: 5 * (r(2, 6) + 6),
  }, ptn)).filter(x => x < 50);
  expect(result).toEqual([]);
});

import { attributeNames, Attributes } from "./attributes";

const eatOr = (text: string) => (text.startsWith('or') ? text.substring(2) : null);

const eatDigit = (text: string): [number, string] | null =>
  (/^\d/.test(text) ? [parseInt(text[0]), text.substring(1)] : null);

const eatMul = (text: string) => (text.startsWith('*') ? text.substring(1) : null);

const eatAdd = (text: string) => (text.startsWith('+') ? text.substring(1) : null);

const eatEmpty = (text: string) => text.trimLeft();

function eatAttr(text: string): [keyof Attributes, string] | null {
  for (let attr of attributeNames) {
    if (text.startsWith(attr.toUpperCase())) {
      return [attr, text.substring(attr.length)];
    }
  }
  return null;
}


export function computeSkillPoint(attributes: Attributes, pattern: string): number {
  const ERROR = -1;
  let sum = 0;
  let current = 0;
  let factor = 1;
  let rest = pattern;
  while (rest !== "") {
    const orResult = eatOr(rest);
    if (orResult !== null) {
      rest = orResult;
      const attrResult = eatAttr(eatEmpty(rest));
      if (attrResult === null) return ERROR;
      const [attr, attrRest] = attrResult;
      const attrValue = attributes[attr];
      current = Math.max(current, attrValue);
      rest = attrRest;
      continue
    }

    const addResult = eatAdd(rest);
    if (addResult !== null) {
      rest = addResult;
      sum = current * factor;
      current = 0;
      factor = 1;
      continue
    }

    const mulResult = eatMul(rest);
    if (mulResult !== null) {
      rest = mulResult;
      const digitResult = eatDigit(eatEmpty(rest));
      if (digitResult === null) return ERROR;
      const [n, digitRest] = digitResult;
      rest = digitRest;
      factor = n;
      continue
    }

    const attrResult = eatAttr(rest);
    if (attrResult !== null) {
      const [attr, attrRest] = attrResult;
      rest = attrRest;
      current = attributes[attr];
    }

    rest = eatEmpty(rest);
  }
  sum += current * factor;
  return sum;
}

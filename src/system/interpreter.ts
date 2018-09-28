import { characteristics, Characteristics } from './stats';


const eatNumber = (text: string): [number, string] | null => {
  const numberPattern = /^\d/;
  const result = numberPattern.exec(text);
  if (result === null) return null;
  else {
    const number = result[0];
    return [parseInt(number), text.substring(number.length)];
  }
};


const eatString = (str: string) => (input: string) =>
  (input.startsWith(str) ? input.substring(str.length) : null);


const eatOr = eatString('or');

const eatMul = eatString('*');

const eatAdd = eatString('+');

// const eatSub = eatString('-');
//
// const eatDiv = eatString('-');

const eatEmpty = (text: string) => text.trimLeft();

function eatAttr(text: string): [keyof Characteristics, string] | null {
  for (let attr of characteristics) {
    if (text.startsWith(attr.toUpperCase())) {
      return [attr, text.substring(attr.length)];
    }
  }
  return null;
}


export function computeSkillPoint(attributes: Partial<Characteristics>, pattern: string): number | null {
  if (pattern.trim() === '') return null;
  let sum = 0;
  let current = 0;
  let factor = 1;
  let rest = pattern;
  while (rest !== '') {
    const orResult = eatOr(rest);
    if (orResult !== null) {
      rest = orResult;
      const attrResult = eatAttr(eatEmpty(rest));
      if (attrResult === null) throw Error('except attribute: ' + rest);
      const [attr, attrRest] = attrResult;
      const attrValue = attributes[attr];
      if (attrValue === undefined) return null;
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
      const numberResult = eatNumber(eatEmpty(rest));
      if (numberResult === null) throw Error('expect number: ' + rest);
      const [n, numberRest] = numberResult;
      rest = numberRest;
      factor = n;
      continue
    }

    const attrResult = eatAttr(rest);
    if (attrResult !== null) {
      const [attr, attrRest] = attrResult;
      rest = attrRest;
      const attrValue = attributes[attr];
      if (attrValue === undefined) return null;
      current = attrValue;
    }

    rest = eatEmpty(rest);
  }
  sum += current * factor;
  return sum;
}

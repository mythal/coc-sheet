import { r } from './roll';
export { AttributeName } from "../text/zh-Hans";

export interface Attributes {
  age: number;
  str: number;
  con: number;
  siz: number;
  dex: number;
  app: number;
  int: number;
  pow: number;
  edu: number;
  luck: number;
}


export type Characteristic = 'str' | 'con' | 'siz' | 'dex' | 'app' | 'int' | 'pow' | 'edu';

export type Characteristics = Pick<Attributes, Characteristic>

export const characteristics: Array<keyof Characteristics> = [
  'str', 'con', 'siz', 'dex', 'app', 'int', 'pow', 'edu'
];


export const autoAttributes = (): Characteristics =>
  ({
    str: 5 * r(3, 6),
    con: 5 * r(3, 6),
    siz: 5 * (r(2, 6) + 6),
    dex: 5 * r(3, 6),
    app: 5 * r(3, 6),
    int: 5 * (r(2, 6) + 6),
    pow: 5 * r(3, 6),
    edu: 5 * (r(2, 6) + 6),
  });



export const rollLuck = (young = false): [number, number] => {
  const a = 5 * r(3, 6);
  const b = 5 * r(3, 6);
  return young && b > a ? [b, a] : [a, b];
};



export const enhance = (attr: number): {check: number, delta: number, attr: number} => {
  const check = r(1, 100);
  let delta = 0;
  if (check > attr) {
    delta = r(1, 10);
    attr = Math.min(99, attr + delta);
  }
  return {check, delta, attr};
};


export const computeDbBuild = ({ str, siz }: Pick<Attributes, 'str' | 'siz'>):
  { db: string, build: number } | null => {
  const sum = str + siz;
  if (sum <= 64 && sum > 1) return { db: '-2', build: -2, };
  else if (sum <= 84) return { db: '-1', build: -1, };
  else if (sum <= 124) return { db: '0', build: 0 };
  else if (sum <= 164) return { db: '+1d4', build: 1 };
  else if (sum <= 204) return { db: '+1d6', build: 2 };
  else if (sum <= 284) return { db: '+2d6', build: 3 };
  else if (sum <= 364) return { db: '+3d6', build: 4 };
  else if (sum <= 444) return { db: '+4d6', build: 5 };
  else if (sum <= 524) return { db: '+5d6', build: 6 };
  else return null;
};


export function mov(age: number, { dex, str, siz }:
  Pick<Attributes, 'dex' | 'str' | 'siz'>) {
  let mov = 0;
  if (dex < siz && str < siz) mov = 7;
  if (dex >= siz || str >= siz) mov = 8;
  if (dex > siz && str > siz) mov = 9;
  if (age >= 80) mov -= 5;
  else if (age >= 70) mov -= 4;
  else if (age >= 60) mov -= 3;
  else if (age >= 50) mov -= 2;
  else if (age >= 40) mov -= 1;
  return mov;
}



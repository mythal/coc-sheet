import { randomIntFromInterval } from '../utils';

export const r = (n: number, face: number) =>
  roll(n, face).reduce((a, b) => a + b, 0);



export function roll(n: number = 1, face: number = 100): Array<number> {
  // const array = new Uint32Array(n);
  // crypto.getRandomValues(array);
  // return Array.from(array).map(Number).map(x => (x % face + 1));
  return Array(n).fill(null).map(() => randomIntFromInterval(1, face))
}


export function choice(xs: Array<any>) {
  return xs[Math.floor(Math.random() * xs.length)];
}

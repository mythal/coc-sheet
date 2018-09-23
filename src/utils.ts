export const isNumeric = (str: string) => /^\d+$/.test(str);

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

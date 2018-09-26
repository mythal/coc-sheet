const uuid1 = require('uuid/v1');

// export const isNumeric = (str: string) => /^\d+$/.test(str);

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const randomId = () => uuid1();


export const formatTime = (date: Date) => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

export const formatDate = (date: Date) => (formatTime(date)+` ${date.getMonth() + 1}-${date.getDay()}`);

const uuid1 = require('uuid/v1');

// export const isNumeric = (str: string) => /^\d+$/.test(str);

export function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const randomId = () => uuid1();


export const pad = (x: number) => x > 9 ? x : '0' + String(x);

export const formatTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

export const formatDate = (date: Date) => (formatTime(date)+` ${date.getMonth() + 1}/${pad(date.getDay())}`);

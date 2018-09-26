import { randomIntFromInterval } from '../utils';
import { AGE_OUT_OF_RANGE, AGE_YOUNG, ageNormalHint } from "../text/zh-Hans";

export interface OutRange { type: 'OutRange' }

export interface Young { type: 'Young' }

export interface Normal {
  type: 'Normal';
  eduEnhance: number;
  multiDeduct: number;
  appDeduct: number;
}


export function randomAge(): number {
  return Array.from(Array(4).keys())
    .map((): number => randomIntFromInterval(15, 90))
    .reduce((a, b) => Math.min(a, b), 100);
}

export function ageAffect(age: number): Normal | Young | OutRange {
  if (age < 15 || age > 90) return { type: 'OutRange' };
  else if (age < 20) return { type: 'Young' };
  let affect: Normal = {
    type: 'Normal',
    eduEnhance: 0,
    multiDeduct: 0,
    appDeduct: 0
  };

  if (age < 40) {
    affect.eduEnhance = 1;
  }
  else if (age < 50) {
    affect.eduEnhance = 2;
    affect.multiDeduct = 5;
    affect.appDeduct = 5;
  }
  else if (age < 60) {
    affect.eduEnhance = 3;
    affect.multiDeduct = 10;
    affect.appDeduct = 10;
  }
  else if (age < 70) {
    affect.eduEnhance = 4;
    affect.multiDeduct = 20;
    affect.appDeduct = 15;
  }
  else if (age < 80) {
    affect.eduEnhance = 4;
    affect.multiDeduct = 40;
    affect.appDeduct = 20;
  }
  else {
    affect.eduEnhance = 4;
    affect.multiDeduct = 80;
    affect.appDeduct = 25;
  }
  return affect;
}



export function ageHint(age: number) {
  const affect = ageAffect(age);
  if (affect.type === 'OutRange') {
    return AGE_OUT_OF_RANGE;
  }
  else if (affect.type === 'Young') {
    return AGE_YOUNG;
  }
  else if (affect.type === 'Normal') {
    return ageNormalHint(affect);
  }
  return null;
}

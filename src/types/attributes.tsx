export interface Attributes {
  str: number;
  con: number;
  siz: number;
  dex: number;
  app: number;
  int: number;
  pow: number;
  edu: number;
}


export const attributeNames: Array<keyof Attributes> = ["str", "con", "siz", "dex", "app", "int", "pow", "edu"];

export const r = (n: number, face: number) =>
  roll(n, face).reduce((a, b) => a + b, 0);


const roll = (n: number, face: number): Array<number> => {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push(Math.floor(Math.random() * face) + 1);
  }
  return result;
};

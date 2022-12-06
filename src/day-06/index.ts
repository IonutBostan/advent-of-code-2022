import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): string => {
  const data = input.trim();

  return data;
};

export const solution1 = (input: string) => {
  const signal = getInput(input);

  let i = 0;

  while (new Set(signal.slice(i, i + 4)).size < 4 && i < signal.length - 4) {
    i++;
  }
  return i + 4;
};

export const solution2 = (input: string) => {
  const signal = getInput(input);

  let i = 0;

  while (new Set(signal.slice(i, i + 14)).size < 14 && i < signal.length - 14) {
    i++;
  }
  return i + 14;
};

console.log(solution1(data));
// 1034;
console.log(solution2(data));
// 2472

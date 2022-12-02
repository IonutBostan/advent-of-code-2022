import { getData, sum } from "../utils";

const data = getData(__dirname);

export const getStrategyGuide = (input: string) => {
  const elves = input
    .trim()
    .split("\n")
    .map((elve) => elve.replace(" ", ""));
  return elves;
};
// A for Rock, B for Paper, and C for Scissors
// X for Rock, Y for Paper, and Z for Scissors
// 1 for Rock, 2 for Paper, and 3 for Scissors
// 0 if you lost, 3 if the round was a draw, and 6 if you won

const scoreMap = {
  AX: 1 + 3, //Rock vs Rock
  AY: 2 + 6,
  AZ: 3 + 0,
  BX: 1 + 0,
  BY: 2 + 3,
  BZ: 3 + 6,
  CX: 1 + 6,
  CY: 2 + 0,
  CZ: 3 + 3,
};

export const getStrategyGuideTotalScore = (input: string) => {
  const strategyGuide = getStrategyGuide(input);
  return sum(strategyGuide.map((step) => scoreMap[step]));
};

// A for Rock, B for Paper, and C for Scissors
// X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win. Good luck!

const newScoreMap = {
  AX: 3 + 0,
  AY: 1 + 3,
  AZ: 2 + 6,
  BX: 1 + 0,
  BY: 2 + 3,
  BZ: 3 + 6,
  CX: 2 + 0,
  CY: 3 + 3,
  CZ: 1 + 6,
};

export const getCompleteStrategyGuideTotalScore = (input: string) => {
  const strategyGuide = getStrategyGuide(input);
  return sum(strategyGuide.map((step) => newScoreMap[step]));
};

console.log(getStrategyGuideTotalScore(data));
// 11150
console.log(getCompleteStrategyGuideTotalScore(data));
// 8295

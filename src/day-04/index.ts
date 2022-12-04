import { getData, sum } from "../utils";

const data = getData(__dirname);

const isOverlapping = (value: number[][]) => {
  const [team1, team2] = value;
  return team1[1] >= team2[0] && team1[0] <= team2[1];
};

const isContained = (value: number[][]) => {
  const [team1, team2] = value;
  return (
    (team1[0] <= team2[0] && team1[1] >= team2[1]) ||
    (team2[0] <= team1[0] && team2[1] >= team1[1])
  );
};

export const getInput = (input: string) =>
  input
    .trim()
    .split("\n")
    .map((line) =>
      line.split(",").map((group) => group.split("-").map(Number))
    );

export const solution1 = (input: string) => {
  const groups = getInput(input);
  return groups.filter(isContained).length;
};

export const solution2 = (input: string) => {
  const groups = getInput(input);
  return groups.filter(isOverlapping).length;
};

console.log(solution1(data));
// 448
console.log(solution2(data));
// 794

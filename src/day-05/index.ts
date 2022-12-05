import { getData, transpose } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): [string[][], number[][]] => {
  const data = input.split("\n\n");

  const storage = data[0]
    .replaceAll("    ", "[0] ")
    .trim()
    .replaceAll(/\[|\]| /g, "")
    .split("\n")
    .map((line) => line.split(""));

  storage.pop();
  storage.reverse();

  const stacks = transpose(storage).map((line) =>
    line.filter((character) => character != "0")
  );

  const moves = data[1]
    .replaceAll(/move |from |to /g, "")
    .split("\n")
    .filter((move) => move != "")
    .map((move) => move.split(" ").map(Number));

  return [stacks, moves];
};

export const solution1 = (input: string) => {
  const [stacks, moves] = getInput(input);
  moves.forEach((move) => {
    const [times, from, to] = move;
    const toArray = stacks[to - 1];
    const fromArray = stacks[from - 1];

    for (let i = 0; i < times; i++) {
      toArray.push(fromArray.pop() || "");
    }
  });

  const solution = stacks.map((stack) => stack.pop()).join("");
  return solution;
};

export const solution2 = (input: string) => {
  const [stacks, moves] = getInput(input);
  moves.forEach((move) => {
    const [times, from, to] = move;
    const toArray = stacks[to - 1];
    const fromArray = stacks[from - 1];

    toArray.push(...fromArray.splice(-times));
  });

  const solution = stacks.map((stack) => stack.pop()).join("");
  return solution;
};

console.log(solution1(data));
// ZRLJGSCTR;
console.log(solution2(data));
// PRTTGRFPB

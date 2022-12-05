import { getData, sum } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): [string[][], number[][]] => {
  const data = input.split("\n\n");

  // Transforms
  //     [D]
  // [N] [C]
  // [Z] [M] [P]
  //  1   2   3
  // to
  // [
  //   [ '0', 'D', '0' ],
  //   [ 'N', 'C', '0' ],
  //   [ 'Z', 'M', 'P' ],
  //   [ '1', '2', '3' ]
  // ]
  const storage = data[0]
    .replaceAll("    ", "[0] ")
    .trim()
    .replaceAll(/\[|\]| /g, "")
    .split("\n")
    .map((line) => line.split(""));

  // remove last line and reverse the array
  storage.pop();
  storage.reverse();
  const length = storage[0].length;

  // storage
  // [
  //   [ 'Z', 'M', 'P' ],
  //   [ 'N', 'C', '0' ],
  //   [ '0', 'D', '0' ],
  // ]

  const stacks = [];
  for (let i = 0; i < length; i++) {
    stacks.push(
      storage
        .map((line) => line[i])
        .join("")
        .replaceAll(" ", "")
        .split("")
        .filter((character) => character != "0")
    );
  }
  // stacks
  // [
  //    [ 'Z', 'N' ],
  //    [ 'M', 'C', 'D' ],
  //    [ 'P' ]
  // ]

  const moves = data[1]
    .replaceAll(/move |from |to /g, "")
    .split("\n")
    .filter((move) => move != "")
    .map((move) => move.split(" ").map(Number));

  return [stacks, moves];
};

const makeMoveOneCrates = (stacks: string[][], move: number[]) => {
  const [times, from, to] = move;
  const toArray = stacks[to - 1];
  const fromArray = stacks[from - 1];

  for (let i = 0; i < times; i++) {
    toArray.push(fromArray.pop() || "");
  }
};

const makeMoveManyCrates = (stacks: string[][], move: number[]) => {
  const [times, from, to] = move;
  const toArray = stacks[to - 1];
  const fromArray = stacks[from - 1];

  toArray.push(...fromArray.slice(times * -1));
  fromArray.splice(times * -1);
};

export const solution1 = (input: string) => {
  const [stacks, moves] = getInput(input);
  moves.forEach((move) => {
    makeMoveOneCrates(stacks, move);
  });

  const solution = stacks
    .map((stack) => stack.reverse())
    .map((stack) => stack[0])
    .join("");
  return solution;
};

export const solution2 = (input: string) => {
  const [stacks, moves] = getInput(input);
  moves.forEach((move) => {
    makeMoveManyCrates(stacks, move);
  });

  const solution = stacks
    .map((stack) => stack.reverse())
    .map((stack) => stack[0])
    .join("");
  return solution;
};

console.log(solution1(data));
// ZRLJGSCTR;
console.log(solution2(data));
// PRTTGRFPB

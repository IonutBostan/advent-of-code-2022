import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): [string, number?][] => {
  const instructions = input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map((el) => (Number(el) ? Number(el) : el)));

  return instructions as [string, number?][];
};

const getProduct = (x: number, index: number) =>
  (index - 20) % 40 === 0 ? index * x : 0;

export const solution1 = (input: string) => {
  const instructions = getInput(input);
  let x = 1;
  let index = 0;
  let solution = 0;

  instructions.forEach(([instruction, add]) => {
    index += 1;
    solution += getProduct(x, index);

    if (instruction === "addx") {
      index += 1;
      solution += getProduct(x, index);
      x += add || 0;
    }
  });

  return solution;
};

const getChar = (x: number, index: number) =>
  Math.abs(x - (index % 40)) <= 1 ? "#" : ".";

export const solution2 = (input: string) => {
  const instructions = getInput(input);
  let x = 1;
  let index = 0;
  let line = "";

  instructions.forEach(([instruction, add]) => {
    line += getChar(x, index);
    index += 1;
    if (instruction === "addx") {
      line += getChar(x, index);
      index += 1;
      x += add || 0;
    }
  });

  const lines: string[] = [];
  for (let i = 0; i < index; i += 40) {
    lines.push(line.substring(i, i + 40));
  }

  return lines;
};

console.log(solution1(data));
// 14840 -> to low
console.log(solution2(data));
// [
//   '###..####.#..#.###..###..#....#..#.###..',
//   '#..#.#....#..#.#..#.#..#.#....#..#.#..#.',
//   '#..#.###..####.#..#.#..#.#....#..#.###..',
//   '###..#....#..#.###..###..#....#..#.#..#.',
//   '#.#..#....#..#.#....#.#..#....#..#.#..#.',
//   '#..#.####.#..#.#....#..#.####..##..###..'
// ]
// REHPRLUB

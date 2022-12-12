import { expect, test } from "vitest";
import { getInput, solution1, solution2 } from ".";

const input = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`;

test("getInput", () => {
  expect(getInput(input)).toEqual([
    [
      [0, 0, 1, 16, 15, 14, 13, 12],
      [0, 1, 2, 17, 24, 23, 23, 11],
      [0, 2, 2, 18, 25, 25, 23, 10],
      [0, 2, 2, 19, 20, 21, 22, 9],
      [0, 1, 3, 4, 5, 6, 7, 8],
    ],
    [0, 0],
    [2, 5],
  ]);
});

test("solution1", () => {
  expect(solution1(input)).toEqual(31);
});

test("solution2", () => {
  expect(solution2(input)).toEqual(29);
});

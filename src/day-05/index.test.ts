import { expect, test } from "vitest";
import { getInput, solution1, solution2 } from ".";

const input = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`;

test("getInput", () => {
  expect(getInput(input)).toEqual([
    [["Z", "N"], ["M", "C", "D"], ["P"]],
    [
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ],
  ]);
});

test("solution1", () => {
  expect(solution1(input)).toEqual("CMZ");
});

test("solution2", () => {
  expect(solution2(input)).toEqual("MCD");
});

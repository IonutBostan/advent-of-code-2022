import { expect, test } from "vitest";
import { getInput, solution1, solution2 } from ".";

// line that begin with $ are commands you executed

const input = `
30373
25512
65332
33549
35390
`;

test("getInput", () => {
  expect(getInput(input)).toEqual([
    [3, 0, 3, 7, 3],
    [2, 5, 5, 1, 2],
    [6, 5, 3, 3, 2],
    [3, 3, 5, 4, 9],
    [3, 5, 3, 9, 0],
  ]);
});

test("solution1", () => {
  expect(solution1(input)).toEqual(21);
});

test("solution2", () => {
  expect(solution2(input)).toEqual(8);
});

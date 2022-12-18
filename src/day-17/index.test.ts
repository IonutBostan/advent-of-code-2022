import { expect, test } from "vitest";
import { getInput, solution1, solution2 } from ".";

const input = `
>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>
`;

test("getInput", () => {
  expect(getInput(input)).toEqual(">>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>");
});

test("solution1", () => {
  expect(solution1(input, 2022)).toEqual(3068);
});

test("solution2", () => {
  expect(solution2(input, 1000000000000)).toEqual(1514285714288);
});

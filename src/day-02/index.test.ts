import { expect, test } from "vitest";
import {
  getStrategyGuide,
  getStrategyGuideTotalScore,
  getCompleteStrategyGuideTotalScore,
} from ".";

const input = `
A Y
B X
C Z
`;

test("getStrategyGuide", () => {
  expect(getStrategyGuide(input)).toEqual(["AY", "BX", "CZ"]);
});

test("getStrategyGuideTotalScore", () => {
  expect(getStrategyGuideTotalScore(input)).toEqual(15);
});

test("getCompleteStrategyGuideTotalScore", () => {
  expect(getCompleteStrategyGuideTotalScore(input)).toEqual(12);
});

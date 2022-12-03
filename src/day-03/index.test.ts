import { expect, test } from "vitest";
import { getBackpacks, getSumOfPriorities, getSumOfBadges } from ".";

const input = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
`;

test("getBackpacks", () => {
  expect(getBackpacks(input)).toEqual([
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ]);
});

test("getSumOfPriorities", () => {
  expect(getSumOfPriorities(input)).toEqual(157);
});

test("getSumOfBadges", () => {
  expect(getSumOfBadges(input)).toEqual(70);
});

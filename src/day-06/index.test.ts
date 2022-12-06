import { expect, test } from "vitest";
import { getInput, solution1, solution2 } from ".";

// the start of a packet -> four characters that are all different

const input = `
mjqjpqmgbljsphdztnvjfqwrcgsmlb
`;

test("getInput", () => {
  expect(getInput(input)).toEqual("mjqjpqmgbljsphdztnvjfqwrcgsmlb");
});

test("solution1", () => {
  expect(solution1(input)).toEqual(7);
  expect(solution1("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(5);
  expect(solution1("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(6);
  expect(solution1("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(10);
  expect(solution1("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(11);
});

test("solution2", () => {
  expect(solution2("mjqjpqmgbljsphdztnvjfqwrcgsmlb")).toEqual(19);
  expect(solution2("bvwbjplbgvbhsrlpgdmjqwftvncz")).toEqual(23);
  expect(solution2("nppdvjthqldpwncqszvftbrmjlhg")).toEqual(23);
  expect(solution2("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg")).toEqual(29);
  expect(solution2("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw")).toEqual(26);
});

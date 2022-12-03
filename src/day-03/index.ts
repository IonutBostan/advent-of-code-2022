import { getData, sum } from "../utils";

const data = getData(__dirname);

const letterToNumber = (l: string) =>
  l.toLowerCase() === l ? l.charCodeAt(0) - 96 : l.charCodeAt(0) - 65 + 27;

const getIntersection = (value: number[][]) => {
  const [arrA, arrB] = value;
  return arrA.filter((v) => arrB.includes(v));
};

const getIntersectionOfThree = (value: number[][]) => {
  const [arrA, arrB, arrC] = value;
  return arrA.filter(
    (element) => arrB.includes(element) && arrC.includes(element)
  );
};

const getFirstElement = (arr: number[]) => arr[0];

export const getBackpacks = (input: string) => input.trim().split("\n");

export const getSumOfPriorities = (input: string) => {
  const backpacks = getBackpacks(input);

  const backpacksWithNumbers = backpacks.map((backpack) =>
    backpack.split("").map(letterToNumber)
  );

  const compartments = backpacksWithNumbers.map((compartment) => [
    compartment.slice(0, compartment.length / 2),
    compartment.slice(compartment.length / 2),
  ]);

  return sum(compartments.map(getIntersection).map(getFirstElement));
};

export const getSumOfBadges = (input: string) => {
  const backpacks = getBackpacks(input);

  const backpacksWithNumbers = backpacks.map((backpack) =>
    backpack.split("").map(letterToNumber)
  );

  const groups = [];
  for (let i = 0; i < backpacksWithNumbers.length; i += 3) {
    groups.push(backpacksWithNumbers.slice(i, i + 3));
  }

  return sum(groups.map(getIntersectionOfThree).map(getFirstElement));
};

console.log(getSumOfPriorities(data));
// 7581
console.log(getSumOfBadges(data));
// 2525

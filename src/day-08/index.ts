import { getData, transpose } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): number[][] => {
  const trees = input
    .trim()
    .split("\n")
    .map((line) => line.split("").map(Number));

  return trees;
};

export const solution1 = (input: string) => {
  const trees = getInput(input);
  const treesTranspose = transpose(trees);

  let visibleCount = trees.length * 2 + (trees[0].length - 2) * 2;

  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[i].length - 1; j++) {
      const tree = trees[i][j];
      if (
        Math.max(...trees[i].slice(0, j)) < tree ||
        Math.max(...trees[i].slice(j + 1)) < tree ||
        Math.max(...treesTranspose[j].slice(0, i)) < tree ||
        Math.max(...treesTranspose[j].slice(i + 1)) < tree
      ) {
        visibleCount += 1;
      }
    }
  }

  return visibleCount;
};

export const solution2 = (input: string) => {
  const trees = getInput(input);

  const scenicScore = new Array(trees.length)
    .fill(0)
    .map(() => new Array(trees[0].length).fill(0));

  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[i].length - 1; j++) {
      let topCount = 1;
      let topIndex = i - 1;
      while (topIndex > 0 && trees[topIndex][j] < trees[i][j]) {
        topCount++;
        topIndex -= 1;
      }

      let bottomCount = 1;
      let bottomIndex = i + 1;
      while (
        bottomIndex < trees.length - 1 &&
        trees[bottomIndex][j] < trees[i][j]
      ) {
        bottomCount++;
        bottomIndex += 1;
      }

      let leftCount = 1;
      let leftIndex = j - 1;
      while (leftIndex > 0 && trees[i][leftIndex] < trees[i][j]) {
        leftCount++;
        leftIndex -= 1;
      }

      let rightCount = 1;
      let rightIndex = j + 1;
      while (
        rightIndex < trees[i].length - 1 &&
        trees[i][rightIndex] < trees[i][j]
      ) {
        rightCount++;
        rightIndex += 1;
      }

      scenicScore[i][j] = topCount * bottomCount * leftCount * rightCount;
    }
  }

  return Math.max(...scenicScore.map((line) => Math.max(...line)));
};

console.log(solution1(data));
// 1705
console.log(solution2(data));
// 371200

import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string) => {
  const lines = input
    .trim()
    .replaceAll(/[a-zA-Z= ]/g, "")
    .split("\n")
    .map((group) => group.split(":").map((el) => el.split(",").map(Number)));
  return lines;
};

const fillIntervals = (
  coordinate: number[][],
  extraLines: number,
  lineNumber: number,
  lineLength: number
) => {
  let posI = coordinate[0][0] + extraLines;
  let posJ = coordinate[0][1] + extraLines;
  const distX = Math.abs(coordinate[0][0] - coordinate[1][0]);
  const distY = Math.abs(coordinate[0][1] - coordinate[1][1]);

  let size = distX + distY;
  const pointCount =
    lineNumber > posJ ? size - lineNumber + posJ : size + lineNumber - posJ;
  let start = Math.max(posI - pointCount, 0);
  let end = Math.min(posI + pointCount + 1, lineLength);
  return [start, end];
};

function intersectRanges(ranges: number[][]) {
  const range = ranges.shift() || [];
  while (ranges.length > 0) {
    const currentRange = ranges.shift() || [];
    if (range[0] <= currentRange[0] && currentRange[1] <= range[1]) {
    } else if (range[1] < currentRange[0]) {
      break;
    } else {
      range[1] = currentRange[1];
    }
  }
  return range;
}

export const solution1 = (input: string, lineNumber: number) => {
  const coordinates = getInput(input);
  const maxY = Math.max(...coordinates.flat().map(([_x, y]) => y));

  let lineIntervals = [];

  for (let i = 0; i < coordinates.length; i++) {
    lineIntervals.push(
      fillIntervals(coordinates[i], maxY, lineNumber + maxY, 3 * maxY)
    );
  }
  lineIntervals = lineIntervals
    .filter(([start, end]) => start < end)
    .sort(([startA, startB], [endA, endB]) => startA - endA || startB - endB);

  const range = intersectRanges(lineIntervals);

  return range[1] - range[0] - 1;
};

export const solution2 = (input: string, maxWidth: number) => {
  const lines = getInput(input);

  let result = 0;

  for (let k = 0; k <= maxWidth; k++) {
    let lineIntervals = [];

    for (let i = 0; i < lines.length; i++) {
      lineIntervals.push(fillIntervals(lines[i], 0, k, maxWidth));
    }
    lineIntervals = lineIntervals
      .filter(([a, b]) => a < b)
      .sort(([a, a1], [b, b1]) => a - b || a1 - b1);

    const range = intersectRanges(lineIntervals);

    if (range[1] < maxWidth) {
      result = range[1] * 4000000 + k;
      break;
    }
  }

  return result;
};

console.log(solution1(data, 2000000));
// 5525990
console.log(solution2(data, 4000000));
// 11756174628223

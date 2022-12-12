import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): [number[][], number[], number[]] => {
  const elevations = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  let start: number[] = [];
  let end: number[] = [];
  const hights = elevations.map((line, i) =>
    line.map((char, j) => {
      if (char === "S") {
        start = [i, j];
        return 0;
      } else if (char === "E") {
        end = [i, j];
        return 25;
      } else {
        return char.charCodeAt(0) - 97;
      }
    })
  );

  return [hights, start, end];
};

const getDistance = (
  m: number[][],
  dist: number[][],
  start: number[],
  end: number[],
  value: number
) => {
  const [i, j] = start;
  dist[i][j] = value;

  if (i === end[0] && j === end[1]) {
    return;
  }

  let nextSteps = [
    [i, j + 1],
    [i, j - 1],
    [i + 1, j],
    [i - 1, j],
  ];

  nextSteps
    .filter(([k, l]) => k >= 0 && l >= 0 && k < m.length && l < m[0].length)

    .filter(([k, l]) => m[k][l] <= m[i][j] + 1)
    .filter(([k, l]) => dist[k][l] === 0 || dist[i][j] + 1 < dist[k][l])
    .forEach((v) => {
      const toCompare = dist[i][j] === 0 ? Infinity : dist[i][j] + 1;
      getDistance(m, dist, v, end, Math.min(toCompare, value + 1));
    });
};

export const solution1 = (input: string) => {
  const [hights, start, end] = getInput(input);

  const distanceMat = new Array(hights.length)
    .fill(0)
    .map(() => new Array(hights[0].length).fill(0));
  getDistance(hights, distanceMat, start, end, 0);

  return distanceMat[end[0]][end[1]];
};

export const solution2 = (input: string) => {
  const [hights, _start, end] = getInput(input);

  let max = Infinity;
  for (let i = 0; i < hights.length; i++) {
    for (let j = 0; j < hights.length; j++) {
      const element = hights[i][j];
      if (element === 0) {
        const distanceMat = new Array(hights.length)
          .fill(0)
          .map(() => new Array(hights[0].length).fill(0));
        getDistance(hights, distanceMat, [i, j], end, 0);
        const result = distanceMat[end[0]][end[1]];
        if (result !== 0) {
          max = Math.min(result, max);
        }
      }
    }
  }
  return max;
};

console.log(solution1(data));
// 420;
console.log(solution2(data));
// 414

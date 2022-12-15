import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string) => {
  const lines = input
    .trim()
    .split("\n")
    .map((line) => line.split(" -> ").map((el) => el.split(",").map(Number)));
  return lines;
};

const isSandOrRock = (e) => ["o", "#"].includes(e);

const fillInRocks = (lines: number[][][], mat: string[][], minX) => {
  lines.forEach((line) => {
    for (let i = 0; i < line.length - 1; i++) {
      const [x, y] = line[i];
      const [x1, y1] = line[i + 1];
      for (let j = x; j <= x1; j++) {
        mat[j - minX][y] = "#";
      }
      for (let j = x; j >= x1; j--) {
        mat[j - minX][y] = "#";
      }
      for (let j = y; j <= y1; j++) {
        mat[x - minX][j] = "#";
      }
      for (let j = y; j >= y1; j--) {
        mat[x - minX][j] = "#";
      }
    }
  });
};

export const solution1 = (input: string) => {
  const lines = getInput(input);

  const inicialLineNumber = 500;
  const minX = Math.min(...lines.flat().map(([a]) => a));
  const maxX = Math.max(...lines.flat().map(([a]) => a));
  const maxY = Math.max(...lines.flat().map(([_a, b]) => b));
  const width = maxX + 1;
  const height = maxY + 10;

  const sandBox = new Array(height)
    .fill(".")
    .map(() => new Array(width + 10).fill("."));

  fillInRocks(lines, sandBox, minX);

  let lineNumber = inicialLineNumber;
  let index = 0;
  let level = 0;

  while (true) {
    let firstBlock = sandBox[lineNumber - minX].indexOf("#", level);
    let firstSand = sandBox[lineNumber - minX].indexOf("o", level);
    firstBlock = firstBlock === -1 ? Infinity : firstBlock;
    firstSand = firstSand === -1 ? Infinity : firstSand;

    let firstSimbol = Math.min(firstBlock, firstSand);

    let newStart = lineNumber - minX;
    let currentElement = sandBox[newStart][firstSimbol];
    let currentTop = sandBox[newStart - 1][firstSimbol];
    let currentBottom = sandBox[newStart + 1][firstSimbol];

    let nextElement = sandBox[newStart][firstSimbol - 1];

    if (isSandOrRock(currentElement)) {
      level = firstSimbol;
    }

    if (currentTop != "." && currentBottom != "." && nextElement === ".") {
      sandBox[newStart][firstSimbol - 1] = "o";
      index++;
      lineNumber = inicialLineNumber;
      level = 0;
    } else if (currentTop === ".") {
      if (newStart === 1) {
        break;
      } else {
        lineNumber--;
      }
    } else if (currentBottom === ".") {
      if (newStart === maxX + 1) {
        break;
      } else {
        lineNumber++;
      }
    } else {
      break;
    }
  }

  return index;
};

export const solution2 = (input: string) => {
  const lines = getInput(input);

  const minX = Math.min(...lines.flat().map(([a]) => a));
  const maxX = Math.max(...lines.flat().map(([a]) => a));
  const maxY = Math.max(...lines.flat().map(([_a, b]) => b));
  const height = maxY + 2;
  const width = maxY + 2;

  const sandBox = new Array(height)
    .fill(".")
    .map(() => new Array(width).fill("."));
  sandBox.map((e) => e.push("#"));

  fillInRocks(lines, sandBox, minX);

  for (let i = 0; i < height; i++) {
    sandBox.unshift([...Array(width).fill("."), "#"]);
  }

  for (let i = 0; i < height; i++) {
    sandBox.push([...Array(width).fill("."), "#"]);
  }

  const inicialLineNumber = 500 + height;

  let lineNumber = inicialLineNumber;
  let index = 0;
  let level = 0;

  while (true) {
    let firstBlock = sandBox[lineNumber - minX].indexOf("#", level);
    let firstSand = sandBox[lineNumber - minX].indexOf("o", level);
    firstBlock = firstBlock === -1 ? Infinity : firstBlock;
    firstSand = firstSand === -1 ? Infinity : firstSand;

    let firstSimbol = Math.min(firstBlock, firstSand);
    if (firstSimbol === 0) {
      break;
    }

    let newStart = lineNumber - minX;
    let currentElement = sandBox[newStart][firstSimbol];
    let currentTop = sandBox[newStart - 1][firstSimbol];
    let currentBottom = 0;
    currentBottom = sandBox[newStart + 1][firstSimbol];

    let nextElement = sandBox[newStart][firstSimbol - 1];

    if (isSandOrRock(currentElement)) {
      level = firstSimbol;
    }

    if (currentTop != "." && currentBottom != "." && nextElement === ".") {
      sandBox[newStart][firstSimbol - 1] = "o";
      index++;
      lineNumber = inicialLineNumber;
      level = 0;
    } else if (currentTop === ".") {
      if (newStart === 1) {
        break;
      } else {
        lineNumber--;
      }
    } else if (currentBottom === ".") {
      if (newStart === maxX + 1) {
        break;
      } else {
        lineNumber++;
      }
    } else {
      break;
    }
  }

  return index;
};

console.log(solution1(data));
// 1513
console.log(solution2(data));
// 22646

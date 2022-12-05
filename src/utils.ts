import fs from "fs";
import path from "path";

export function getData(dir: string) {
  return fs.readFileSync(path.resolve(dir, "./input.txt"), {
    encoding: "utf-8",
  });
}

export const sum = (n: number[]) => n.reduce((value, sum) => value + sum, 0);

export const transpose = <T>(matrix: T[][]): T[][] => {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
};

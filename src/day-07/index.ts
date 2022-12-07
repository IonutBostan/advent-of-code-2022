import { getData, sum } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): string[] => {
  const terminal = input.trim().split("\n");

  return terminal;
};

const calculatePath = (current: string, dir: string) =>
  (current + "/" + dir).replace("//", "/");

const switchToAbsolutePaths = (terminal: string[]) => {
  let path = "/";

  for (let i = 1; i < terminal.length; i++) {
    if (terminal[i] === "$ cd ..") {
      path = path.slice(0, Math.max(path.lastIndexOf("/"), 1));
    } else if (terminal[i].indexOf("$ cd") === 0) {
      path = calculatePath(path, terminal[i].split(" ")[2]);
      terminal[i] = "$ cd " + path;
    }
  }

  return terminal;
};

const calculateSize = (directories: any[], terminal: any, index: number) => {
  let sum = 0;
  let currentPath = terminal[index].split(" ")[2];

  let i = index + 1;
  while (i < terminal.length && terminal[i].indexOf("$ cd") === -1) {
    if (terminal[i].indexOf("dir ") === 0) {
      const command =
        "$ cd " + calculatePath(currentPath, terminal[i].split(" ")[1]);

      const directorySize = calculateSize(
        directories,
        terminal,
        terminal.indexOf(command)
      );

      sum = sum + directorySize;
    } else if (terminal[i].indexOf("$") === -1) {
      const size = Number(terminal[i].split(" ")[0]);

      sum = sum + size;
    }
    i = i + 1;
  }

  directories.push(sum);
  return sum;
};

export const solution1 = (input: string) => {
  let terminal = getInput(input);
  terminal = switchToAbsolutePaths(terminal);

  const directories: number[] = [];
  calculateSize(directories, terminal, 0);

  return sum(directories.filter((size) => size < 100000));
};

export const solution2 = (input: string) => {
  let terminal = getInput(input);

  terminal = switchToAbsolutePaths(terminal);

  const directories: number[] = [];

  calculateSize(directories, terminal, 0);

  const totalSpace = 70000000;
  const spaceNeed = 30000000;

  const totalSize = Math.max(...directories);
  const availableSpace = totalSpace - totalSize;

  return directories
    .filter((size) => size > spaceNeed - availableSpace)
    .sort((a, b) => a - b)
    .shift();
};

console.log(solution1(data));
// 1513699
console.log(solution2(data));
// 7991939

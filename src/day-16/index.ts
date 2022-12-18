import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string) => {
  const valves = input
    .trim()
    .replaceAll(/[a-z ]/g, "")
    .split("\n")
    .map((l) => l.slice(1).split(";"))
    .map((l) => [
      l[0].split("=")[0],
      Number(l[0].split("=")[1]),
      l[1].split(","),
    ]);
  return valves;
};

export const solution1 = (input: string) => {
  let valves = getInput(input);

  let valvesIndex = [...new Set(valves.map((v) => v[0]))].sort((a, b) => b - a);

  valves = valves.map((valve) => [
    valvesIndex.indexOf(valve[0]),
    valve[1],
    valve[2].map((tunnel: string) => valvesIndex.indexOf(tunnel)),
  ]);

  let totalTime = 30;

  let distanceMat = calculateDistMat(valves);
  let rates = valves.map((v) => v[1]);

  const elementsWithRate = valves
    .filter((v) => v[1] > 0)
    .map((v) => v[0]) as number[];
  let max = 0;

  const calculateNextMove = (
    elements: number[],
    current: number,
    time: number,
    acc
  ) => {
    elements.forEach((next) => {
      const timeToMove = distanceMat[current][next];

      if (time - timeToMove - 1 > 0) {
        const preasure = (time - timeToMove - 1) * rates[next];

        calculateNextMove(
          elements.filter((e) => e !== next),
          next,
          time - timeToMove - 1,
          acc + preasure
        );
      }
    });

    if (acc > max) {
      max = acc;
    }
  };

  calculateNextMove(elementsWithRate, valvesIndex.indexOf("AA"), totalTime, 0);

  return max;
};

export const solution2 = (input: string) => {
  let valves = getInput(input);

  let valvesIndex = [...new Set(valves.map((v) => v[0]))].sort((a, b) => b - a);

  valves = valves.map((valve) => [
    valvesIndex.indexOf(valve[0]),
    valve[1],
    valve[2].map((tunnel) => valvesIndex.indexOf(tunnel)),
  ]);

  const totalTime = 26;
  let distanceMat = calculateDistMat(valves);

  const elementsWithRate = valves
    .filter((v) => v[1] > 0)
    .map((v) => v[0]) as number[];
  let max = 0;

  let rates = valves.map((v) => v[1]);

  const calculateNextMove = (
    elements: number[],
    current: number,
    currentElephant: number,
    time: number,
    elephantTime: number,
    acc: number
  ) => {
    elements.forEach((next) => {
      const timeToMove = distanceMat[current][next];

      if (time - timeToMove - 1 > 0) {
        const preasure = (time - timeToMove - 1) * rates[next];
        elements.forEach((nextElephant) => {
          if (next !== nextElephant) {
            const elephantTimeToMove =
              distanceMat[currentElephant][nextElephant];

            if (elephantTime - elephantTimeToMove - 1 > 0) {
              calculateNextMove(
                elements.filter((e) => e !== next && e !== nextElephant),
                next,
                nextElephant,
                time - timeToMove - 1,
                elephantTime - elephantTimeToMove - 1,
                acc +
                  preasure +
                  (elephantTime - elephantTimeToMove - 1) * rates[nextElephant]
              );
            }
          }
        });
      }
    });
    if (acc > max) {
      max = acc;
    }
  };

  calculateNextMove(
    elementsWithRate,
    valvesIndex.indexOf("AA"),
    valvesIndex.indexOf("AA"),
    totalTime,
    totalTime,
    0
  );

  return max;
};

let timeLog = new Date().getTime();
console.log(solution1(data));
console.log("time=", (new Date().getTime() - timeLog) / 1000);
// 1857 - correct
console.log(solution2(data));
console.log("time=", (new Date().getTime() - timeLog) / 1000);
// 2536 in 7.615s

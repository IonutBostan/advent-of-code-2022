import { getData, transpose } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): string => {
  const movements = input.trim().replaceAll(/[a-z ]/g, "");

  return movements;
};

const getTetrix = (
  moves: string,
  rockCount: number
): [number[][], number[], number[]] => {
  const tetrix: number[][] = [[], [], [], [], [], [], []];

  let moveCount = 0;
  let maxHeight = -1;
  let startLeft = 2;
  let startUp = 4;
  const heights: number[] = [];
  const heightsIndex: number[] = [];

  let groups = [
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [3, 0],
    ],
    [
      [1, 0],
      [1, 1],
      [0, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [2, 2],
      [2, 1],
      [2, 0],
      [1, 0],
      [0, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ].map((group) => group.map(([x, y]) => [x + startLeft, y + startUp]));

  for (let i = 0; i < rockCount; i++) {
    const groupIndex = i % groups.length;
    let rock = groups[groupIndex].map(([x, y]) => [x, y + maxHeight]);

    while (true) {
      // Move left right
      let move = moves[moveCount % moves.length];
      moveCount++;

      let sign = move == "<" ? -1 : 1;
      let nextPosRock = rock.map(([x, y]) => [x + 1 * sign, y]);

      const canMoveLR = nextPosRock.reduce(
        (acc, [x, y]) => Boolean(acc && !(x < 0 || x >= 7 || tetrix[x][y])),
        true
      );
      if (canMoveLR) {
        rock = nextPosRock;
      }

      // Move down
      nextPosRock = rock.map(([x, y]) => [x, y - 1]);
      let canMoveDown = nextPosRock.reduce(
        (acc, [x, y]) => Boolean(acc || y < 0 || tetrix[x][y]),
        false
      );

      if (canMoveDown) {
        rock.forEach(([x, y]) => {
          tetrix[x][y] = 1;
          if (y > maxHeight) {
            maxHeight = y;
            heights.push(y);
            heightsIndex.push(i);
          }
        });
        break;
      } else {
        rock = nextPosRock;
      }
    }
  }
  return [tetrix, heights, heightsIndex];
};

export const solution1 = (input: string, rockCount: number) => {
  let moves = getInput(input);

  const [tetrix] = getTetrix(moves, rockCount);

  return Math.max(...tetrix.map((l) => l.length));
};

export const solution2 = (input: string, rocks: number) => {
  let moves = getInput(input);

  const [tetrix, heights, heightsIndex] = getTetrix(moves, 5000);

  const tetrixTranspose = transpose(tetrix);
  const intervalIndex: number[] = [];
  const blockNumberAtInterval = [];
  const distance = 50;

  for (let i = 0; i <= 100; i += 5) {
    const start = i;
    const toCompare = JSON.stringify(
      tetrixTranspose.slice(start, start + distance)
    );

    for (let j = start + 1; j < tetrixTranspose.length; j++) {
      if (
        toCompare === JSON.stringify(tetrixTranspose.slice(j, j + distance))
      ) {
        intervalIndex.push(j);
      }
    }

    if (intervalIndex.length > 0) {
      for (let j = 0; j < intervalIndex.length; j++) {
        const blockNumber = heightsIndex[heights.indexOf(intervalIndex[j])];
        blockNumberAtInterval.push(blockNumber);
      }
      break;
    }
  }

  const repeatingInterval = blockNumberAtInterval[1] - blockNumberAtInterval[0];
  const repeatNumber = Math.trunc(
    (rocks - blockNumberAtInterval[0]) / repeatingInterval
  );
  const remainingAfterLastInterval =
    (rocks - blockNumberAtInterval[0]) % repeatingInterval;
  const heightPerInterval =
    heights[heightsIndex.indexOf(blockNumberAtInterval[1])] -
    heights[heightsIndex.indexOf(blockNumberAtInterval[0])];

  const result =
    repeatNumber * heightPerInterval +
    heights[
      heightsIndex.indexOf(
        blockNumberAtInterval[0] + remainingAfterLastInterval
      )
    ];

  return result;
};

// let timeLog = new Date().getTime();
console.log(solution1(data, 2022));
// 3135

console.log(solution2(data, 1000000000000));
// 1569054441243
// console.log("time=", (new Date().getTime() - timeLog) / 1000);

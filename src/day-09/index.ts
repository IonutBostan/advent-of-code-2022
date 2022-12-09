import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string): [string, number][] => {
  const motions = input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map((el) => (Number(el) ? Number(el) : el)));

  return motions as [string, number][];
};

const doMove = (head: number[], direction: string) => {
  if (direction == "R") {
    head[0] += 1;
  }
  if (direction == "L") {
    head[0] -= 1;
  }
  if (direction == "U") {
    head[1] -= 1;
  }
  if (direction == "D") {
    head[1] += 1;
  }
};

export const solution1 = (input: string) => {
  const motions = getInput(input);

  const head = [0, 0];
  const tail = [0, 0];
  const tailPositions = new Set();
  tailPositions.add(tail.join("|"));

  for (let i = 0; i < motions.length; i++) {
    const [direction, steps] = motions[i];
    for (let j = 0; j < steps; j++) {
      doMove(head, direction);

      const xDiff = head[0] - tail[0];
      const yDiff = head[1] - tail[1];

      // The head can move only left, right, top, down
      if (Math.abs(xDiff) == 2) {
        tail[0] += xDiff / 2;
        tail[1] = head[1];
      } else if (Math.abs(yDiff) == 2) {
        tail[0] = head[0];
        tail[1] += yDiff / 2;
      }

      tailPositions.add(tail.join("|"));
    }
  }

  return tailPositions.size;
};

export const solution2 = (input: string) => {
  const motions = getInput(input);

  const knots = Array(10)
    .fill(0)
    .map(() => [0, 0]);

  const tailPositions = new Set();
  tailPositions.add(knots[9].join("|"));

  for (let i = 0; i < motions.length; i++) {
    const [direction, steps] = motions[i];
    for (let j = 0; j < steps; j++) {
      doMove(knots[0], direction);

      for (let k = 1; k < knots.length; k++) {
        const xDiff = knots[k - 1][0] - knots[k][0];
        const yDiff = knots[k - 1][1] - knots[k][1];

        // The head can move only left, right, top, down
        // The intermediary nodes can also move in diagonal - |xDiff| and |yDiff| are 2
        if (Math.abs(xDiff) == 2 && Math.abs(yDiff) == 2) {
          knots[k][0] += xDiff / 2;
          knots[k][1] += yDiff / 2;
        } else if (Math.abs(xDiff) == 2) {
          knots[k][0] += xDiff / 2;
          knots[k][1] = knots[k - 1][1];
        } else if (Math.abs(yDiff) == 2) {
          knots[k][0] = knots[k - 1][0];
          knots[k][1] += yDiff / 2;
        }
      }

      tailPositions.add(knots[9].join("|"));
    }
  }

  return tailPositions.size;
};

console.log(solution1(data));
// 6503
console.log(solution2(data));
// 2724

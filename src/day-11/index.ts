import { getData } from "../utils";

const data = getData(__dirname);

type Monkey = [number[], [string, number], number[]];

export const getInput = (input: string): Monkey[] => {
  const monkeys = input
    .trim()
    .split("\n\n")
    .map((monkey) => {
      const lines = monkey.replaceAll(/[a-zA-Z:= ]/g, "").split("\n");
      const [_index, items, operation, test, ifTrue, ifFalse] = lines;

      const formatedItems = items.split(",").map(Number);
      let formatedOperation = [operation.charAt(0), Number(operation.slice(1))];
      if (formatedOperation[1] === 0) {
        formatedOperation[0] = "**";
      }
      const formatedTest = [Number(test), Number(ifTrue), Number(ifFalse)];

      return [formatedItems, formatedOperation, formatedTest];
    });

  return monkeys as Monkey[];
};

const applyOperation =
  (operation: [string, number]) =>
  (item: number): number => {
    const [sign, amount] = operation;
    if (sign === "+") {
      return item + amount || 0;
    } else if (sign === "*") {
      return item * amount || 1;
    } else {
      return item * item;
    }
  };

const divideBy = (by: number) => (item: number) => Math.floor(item / by);

const throwItem =
  (monkeys: Monkey[], condition: number[]) => (item: number) => {
    const [divisibleBy, ifTrue, ifFalse] = condition;
    monkeys[item % divisibleBy === 0 ? ifTrue : ifFalse][0].push(item);
  };

const productOfBigestTwo = (arr: number[]) =>
  arr
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((acc, el) => acc * el, 1);

export const solution1 = (input: string) => {
  const monkeys = getInput(input);
  const inspectedItems = new Array(monkeys.length).fill(0);

  for (let i = 0; i < 20; i++) {
    for (let k = 0; k < monkeys.length; k++) {
      const [items, operation, condition] = monkeys[k];

      items
        .map(applyOperation(operation))
        .map(divideBy(3))
        .map(throwItem(monkeys, condition));

      inspectedItems[k] += items.length;
      monkeys[k][0] = [];
    }
  }
  return productOfBigestTwo(inspectedItems);
};

export const solution2 = (input: string) => {
  const monkeys = getInput(input);
  const inspectedItems = new Array(monkeys.length).fill(0);

  const primesProduct = monkeys.reduce((acc, item) => acc * item[2][0], 1);

  for (let i = 0; i < 10000; i++) {
    for (let k = 0; k < monkeys.length; k++) {
      const [items, operation, condition] = monkeys[k];

      items
        .map(applyOperation(operation))
        .map((item) => item % primesProduct)
        .map(throwItem(monkeys, condition));

      inspectedItems[k] += items.length;
      monkeys[k][0] = [];
    }
  }
  return productOfBigestTwo(inspectedItems);
};

console.log(solution1(data));
// 56120
console.log(solution2(data));
// 24389045529

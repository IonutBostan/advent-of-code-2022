import { getData } from "../utils";

const data = getData(__dirname);

export const getInput = (input: string) => {
  const packets = input
    .trim()
    .replaceAll("10", "a")
    .split("\n\n")
    .map((line) => line.split("\n").map((l) => l.trim()));

  return packets;
};

const isNumberOrLetter = (s: string) => s.match(/\w+/g)?.length! > 0;

const addBrackets = (s: string, i: number) =>
  s.slice(0, i) + "[" + s.charAt(i) + "]" + s.slice(i + 1);

const rightOrder = ([exp1, exp2]: string[]) => {
  const order = true;
  let i = 0;
  let depth1 = 0;
  let depth2 = 0;
  while (i < Math.min(exp1.length, exp2.length)) {
    const char1 = exp1.charAt(i);
    const char2 = exp2.charAt(i);

    if (char1 === "[") depth1++;
    if (char1 === "]") depth1--;
    if (char2 === "[") depth2++;
    if (char2 === "]") depth2--;

    if (depth1 !== depth2) {
      if (char1 === "[" && isNumberOrLetter(char2)) {
        exp2 = addBrackets(exp2, i);
        depth2++;
      } else if (char2 === "[" && isNumberOrLetter(char1)) {
        exp1 = addBrackets(exp1, i);
        depth1++;
      } else {
        return depth1 < depth2;
      }
    } else if (
      isNumberOrLetter(char1) &&
      isNumberOrLetter(char2) &&
      char1 !== char2
    ) {
      return char1 < char2;
    }

    i++;
  }

  return order;
};

export const solution1 = (input: string) => {
  const packets = getInput(input);

  let sum = 0;
  packets.forEach((packet, i) => {
    if (rightOrder(packet)) {
      sum += i + 1;
    }
  });

  return sum;
};

export const solution2 = (input: string) => {
  const packets = getInput(input);

  const dividerPack1 = "[[2]]";
  const dividerPack2 = "[[6]]";
  const flat = packets.flat();
  flat.push(dividerPack1, dividerPack2);
  flat.sort((a, b) => (rightOrder([a, b]) ? -1 : 1));

  return (flat.indexOf(dividerPack1) + 1) * (flat.indexOf(dividerPack2) + 1);
};

console.log(solution1(data));
// 4821
console.log(solution2(data));
// 21890

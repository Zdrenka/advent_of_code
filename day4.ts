import fs from "fs";
const input = fs.readFileSync("resources/input_day4.txt", "utf8");

const lines = input.split("\n") as string[];

type Pair = {
  from: number;
  to: number;
};

function createPairs(line: string): [Pair, Pair] {
  const splitted = line.split(",");
  const first = splitted[0].split("-");
  const second = splitted[1].split("-");
  const firstPair: Pair = { from: Number(first[0]), to: Number(first[1]) };
  const secondPair: Pair = { from: Number(second[0]), to: Number(second[1]) };
  return [firstPair, secondPair];
}

function generateMissingNumbers(start: number, end: number): number[] {
  let numbers: number[] = [];
  for (start; start <= end; start++) {
    numbers.push(start);
  }
  return numbers;
}

let sum1 = 0;
lines.forEach((line) => {
  const [first, second] = createPairs(line);
  if (first.from >= second.from && first.to <= second.to) {
    sum1++;
  } else if (second.from >= first.from && second.to <= first.to) {
    sum1++;
  }
});
console.log(sum1);

let sum2 = 0;
lines.forEach((line) => {
  const [first, second] = createPairs(line);
  const firstNumbers = generateMissingNumbers(first.from, first.to);
  const secondNumbers = generateMissingNumbers(second.from, second.to);
  firstNumbers.every((num) => {
    if (secondNumbers.includes(num)) {
      sum2++;
      return false;
    }
    return true;
  });
});
console.log(sum2);

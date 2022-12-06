// const fs = require("fs");
// const input = fs.readFileSync("resources/input_day3.txt", "utf8");

// const row = input.split("\n") as string[];

// function getHalves(items: string): [string, string] {
//   const length = items.length;
//   return [items.substring(0, length / 2), items.substring(length / 2)];
// }

// function getShared(first: string, second: string): string | null {
//   const lettersInFirst = new Set();
//   const lettersInSecond = new Set();
//   for (let i = 0; i < first.length; i++) {
//     if (first[i] === second[i]) {
//       return first[i];
//     }
//     lettersInFirst.add(first[i]);
//     lettersInSecond.add(second[i]);

//     if (lettersInSecond.has(first[i])) {
//       return first[i];
//     }
//     if (lettersInFirst.has(second[i])) {
//       return second[i];
//     }
//   }
//   return null;
// }

// function getValue(char: string): number {
//   const c = char.charCodeAt(0);

//   if (c >= 65 && c <= 90) {
//     return c - 38;
//   } else {
//     return c - 96;
//   }
// }

// const result = row.reduce((currentSum, rucksack) => {
//   const shared = getShared(...getHalves(rucksack));
//   if (!shared) {
//     return currentSum;
//   }
//   return currentSum + getValue(shared);
// }, 0);

// console.log(result);

import { day3 } from "../../data";

const row = day3.split("\n") as string[];

function getShared(one: string, two: string, three: string): string | null {
  const first = new Set();
  const second = new Set();
  const third = new Set();
  for (let i = 0; i < Math.max(one.length, two.length, three.length); i++) {
    const letterInFirst = one[i];
    const letterInSecond = two[i];
    const letterInThird = three[i];

    if (letterInFirst === letterInSecond && letterInSecond === letterInThird) {
      return letterInFirst;
    }
    if (letterInFirst) first.add(letterInFirst);
    if (letterInSecond) second.add(letterInSecond);
    if (letterInThird) third.add(letterInThird);

    if (second.has(letterInFirst) && third.has(letterInFirst)) {
      return letterInFirst;
    }
    if (first.has(letterInSecond) && third.has(letterInSecond)) {
      return letterInSecond;
    }
    if (first.has(letterInThird) && second.has(letterInThird)) {
      return letterInThird;
    }
  }

  return null;
}

function getValue(char: string): number {
  const charCode = char.charCodeAt(0);
  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  } else {
    return charCode - 96;
  }
}

let result = 0;
for (let i = 0; i < row.length; i += 3) {
  const shared = getShared(row[i], row[i + 1], row[i + 2]);
  if (!shared) {
    continue;
  }
  result += getValue(shared);
}

console.log(result);

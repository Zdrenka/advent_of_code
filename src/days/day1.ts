import { day1 } from "../../data";

const results: number[] = [];

const batches = day1.split("\n\n");
batches.forEach((group) => {
  results.push(
    group
      .split("\n")
      .map((str) => {
        return Number(str);
      })
      .reduce((sum, current) => sum + current, 0)
  );
});

function getTopThree(results: number[]) {
  const sorted = results.sort((n1, n2) => n1 - n2);
  return sorted.pop() + sorted.pop() + sorted.pop();
}

console.log("first star: " + Math.max(...results));
console.log("second star: " + getTopThree(results));

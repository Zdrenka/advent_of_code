import fs from "fs";

async function day1Task(callback) {
  const results: number[] = [];
  fs.readFile("resources/input_day1.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const batches = data.split("\n\n");
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
    callback(results);
  });
}
function firstStar() {
  day1Task(function (results, err) {
    console.log(Math.max(...results));
  });
}

function secondStar() {
  day1Task(function (results, err) {
    const sorted = results.sort((n1, n2) => n1 - n2);
    console.log(sorted.pop() + sorted.pop() + sorted.pop());
  });
}

firstStar();
secondStar();

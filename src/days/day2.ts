import { day2 } from "../../data";
let score = 0;

function generateScore(task: number, line: String) {
  switch (line) {
    case "A X":
      task === 1 ? (score += 4) : (score += 3);
      break;
    case "A Y":
      task === 1 ? (score += 8) : (score += 4);
      break;
    case "A Z":
      task === 1 ? (score += 3) : (score += 8);
      break;
    case "B X":
      score += 1;
      break;
    case "B Y":
      score += 5;
      break;
    case "B Z":
      score += 9;
      break;
    case "C X":
      task === 1 ? (score += 7) : (score += 2);
      break;
    case "C Y":
      task === 1 ? (score += 2) : (score += 6);
      break;
    case "C Z":
      task === 1 ? (score += 6) : (score += 7);
      break;
  }
}
function day2Task(task: number) {
  const lines = day2.split("\n");
  lines.forEach((line) => {
    generateScore(task, line);
  });
  console.log(score);
}

day2Task(2);

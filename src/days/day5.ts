import { day5 } from "../../data";

function day5Task1() {
  const lines = splitLinesIntoArray(day5);
  const { inventoryLines, instructions } = parseInput(lines);
  const stacks = buildStacks(inventoryLines);
  operateCran(1, instructions, stacks);
  console.log("first star: " + stacks.map((stack) => stack[0]).join(""));
}

function day5Task2() {
  const lines = splitLinesIntoArray(day5);
  const { inventoryLines, instructions } = parseInput(lines);
  const stacks = buildStacks(inventoryLines);
  operateCran(2, instructions, stacks);
  console.log("second star: " + stacks.map((stack) => stack[0]).join(""));
}

function parseInput(lines: string[]) {
  const inventoryLines = [];
  const instructions = [];

  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      continue;
    }
    if (lines[i].includes("[") || lines[i][0] === " ") {
      inventoryLines.push(lines[i]);
    } else if (lines[i].startsWith("move")) {
      instructions.push(lines[i]);
    }
  }

  return { inventoryLines, instructions };
}

function buildStacks(lines: string[]): string[][] {
  const stacks = [];
  const crateNumberLine = lines[lines.length - 1];
  const stackIndex = [];
  for (let i = 0; i < crateNumberLine.length; i++) {
    if (crateNumberLine[i] !== " ") {
      stackIndex.push(i);
      stacks.push([]);
    }
  }

  for (let l = 0; l < lines.length - 1; l++) {
    const line = lines[l];
    for (let c = 0; c < stackIndex.length; c++) {
      if (line[stackIndex[c]] !== " ") {
        stacks[c].push(line[stackIndex[c]]);
      }
    }
  }

  return stacks;
}

function operateCran(
  task: 1 | 2,
  instructions: string[],
  stacks: string[][]
): string[][] {
  const instructionRegex = /move (\d+) from (\d+) to (\d+)/;
  for (const instruction of instructions) {
    const matches = instructionRegex.exec(instruction);
    const times = parseInt(matches[1]);
    const from = parseInt(matches[2]) - 1;
    const to = parseInt(matches[3]) - 1;

    for (let a = 0; a < times; a++) {
      const crate = stacks[from].shift();
      if (task === 1) {
        stacks[to].unshift(crate);
      } else {
        stacks[to].splice(a, 0, crate);
      }
    }
  }

  return stacks;
}

function getTopCrateString(stacks: string[][]) {
  return stacks.map((stack) => stack[0]).join("");
}

function splitLinesIntoArray(input: string) {
  return input.split("\n");
}

day5Task1();
day5Task2();

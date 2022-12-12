/* 
    register starts with value 1 = X 

    -   addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
    -   noop takes one cycle to complete. It has no other effect.
*/

import { day10 } from "../../data";

export const day10PartOne = () =>
  console.log(getSignalStrengthSumAtInterestingCycles(readInstructions()));

export const day10PartTwo = () => console.log(drawCRTImage(readInstructions()));

const readInstructions = () => parseInstructions(day10);

export const parseInstructions = (input: string): Instruction[] =>
  input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line)
    .map((line) => {
      const [operator, operand] = line.split(" ");
      return {
        operator: operator as Operator,
        operand: operand ? parseInt(operand, 10) : undefined,
      };
    });

export const getSignalStrengthSumAtInterestingCycles = (
  instructions: Instruction[]
) =>
  [20, 60, 100, 140, 180, 220]
    .map((cycle) => getSignalStrengthAt(instructions, cycle))
    .reduce((total, strength) => total + strength, 0);

export const getSignalStrengthAt = (
  instructions: Instruction[],
  cycles: number
) => {
  let signal = 1;
  let pc = 0;
  let cycle = 1;
  while (cycle < cycles) {
    const { operator, operand } = instructions[pc];
    if (operator === "addx" && operand) {
      cycle += 2;
      if (cycle <= cycles) {
        signal += operand;
      }
    } else {
      cycle++;
    }
    pc++;
  }
  return signal * cycles;
};

export const drawCRTImage = (instructions: Instruction[]) => {
  const lines = Array.from(Array(6)).map(() => Array.from(Array(40)).fill("."));
  let signal = 1;
  let pc = 0;
  let cycle = 0;
  let cycleAtOpStart = cycle;
  while (cycle < 240) {
    const row = Math.floor(cycle / 40);
    const col = cycle % 40;
    lines[row][col] = Math.abs(signal - col) <= 1 ? "#" : ".";

    const { operator, operand } = instructions[pc];
    if (operator === "addx" && operand && cycleAtOpStart + 1 === cycle) {
      signal += operand;
      pc++;
      cycleAtOpStart = cycle + 1;
    } else if (operator === "noop") {
      pc++;
      cycleAtOpStart = cycle + 1;
    }

    cycle++;
  }
  return `\n${lines.map((line) => line.join("")).join("\n")}`;
};

type Instruction = {
  operator: Operator;
  operand?: number;
};

type Operator = "addx" | "noop";

day10PartTwo();

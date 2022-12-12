// import { day8 } from "../../data";
// const grid = day8.split("\n").map((line) => line.split("").map(Number));

// const perimeter = grid.length * 4 - 4;
// let visibleTrees = perimeter;

// for (let i = 1; i < grid.length - 1; i++) {
//   for (let j = 1; j < grid[i].length - 1; j++) {
//     const tree = grid[i][j];
//     if (isVisible(tree, i, j)) {
//       visibleTrees++;
//     }
//   }
// }

// function isVisible(tree: number, row: number, col: number) {
//   const visibleUp = () => {
//     for (let i = 0; i < row; i++) {
//       if (grid[i][col] >= tree) return false;
//     }
//     return true;
//   };
//   const visibleDown = () => {
//     for (let i = row + 1; i < grid.length; i++) {
//       if (grid[i][col] >= tree) return false;
//     }
//     return true;
//   };
//   const visibleLeft = () => {
//     for (let i = 0; i < col; i++) {
//       if (grid[row][i] >= tree) return false;
//     }
//     return true;
//   };
//   const visibleRight = () => {
//     for (let i = col + 1; i < grid.length; i++) {
//       if (grid[row][i] >= tree) return false;
//     }
//     return true;
//   };

//   return visibleUp() || visibleDown() || visibleLeft() || visibleRight();
// }

// console.log("The amount of visible trees is:", visibleTrees); // answer: 1809

import { day8 } from "../../data";
const grid = day8.split("\n").map((line) => line.split("").map(Number));

let highest = 0;

for (let i = 1; i < grid.length - 1; i++) {
  for (let j = 1; j < grid[i].length - 1; j++) {
    calcScore(i, j);
  }
}

function calcScore(row: number, col: number) {
  const tree = grid[row][col];
  let [up, down, left, right] = [0, 0, 0, 0];

  // check up
  for (let i = row - 1; i >= 0; i--) {
    up++;
    if (grid[i][col] >= tree) break;
  }

  // check down
  for (let i = row + 1; i < grid.length; i++) {
    down++;
    if (grid[i][col] >= tree) break;
  }

  // check left
  for (let i = col - 1; i >= 0; i--) {
    left++;
    if (grid[row][i] >= tree) break;
  }

  // check right
  for (let i = col + 1; i < grid.length; i++) {
    right++;
    if (grid[row][i] >= tree) break;
  }

  const score = up * down * left * right;

  if (score > highest) {
    highest = score;
  }
}

console.log("The highest scenic score is:", highest);

import { day6 } from "../../data";
const data = day6.split("");
for (let i = 0; i < data.length; i++) {
  let results = new Set(data.slice(i, i + 4));
  if (results.size === 4) {
    console.log(i + 4);
    break;
  }
}

for (let i = 0; i < data.length; i++) {
  let results = new Set(data.slice(i, i + 14));
  if (results.size === 14) {
    console.log(i + 14);
    break;
  }
}

import fs from "fs";
import { checkEvenLengthDigits, splitEvenDigits, splitRow } from "./utils.js";

let memo = {};

function calculateBranch(value, n) {
  console.log(n, " :: ", value);

  if (n === 0) {
    return 1;
  }

  if (memo[`${value}-${n}`]) {
    return memo[`${value}-${n}`];
  }

  let r = 0;

  if (value === 0) {
    r = calculateBranch(1, n - 1);
  } else if (checkEvenLengthDigits(value)) {
    let [a, b] = splitEvenDigits(value);
    r = calculateBranch(a, n - 1) + calculateBranch(b, n - 1);
  } else {
    r = calculateBranch(value * 2024, n - 1);
  }
  memo[`${value}-${n}`] = r;
  console.log(n, " :: ", value);
  return r;
}

fs.readFile("../../data/day11.txt", (_, data) => {
  let input = data.toString();
  let row = splitRow(input);
  let len = 0;
  console.log(row);
  for (const x in row) {
    len += calculateBranch(row[x], 75);
  }
  console.log(len);
});

const fs = require("fs");
const { splitRow, blinkNTimes } = require("./utils");

fs.readFile("../../data/day11.txt", (err, data) => {
  let input = data.toString();
  let row = splitRow(input);
  let res = blinkNTimes(row, 25);
  console.log(res.length);
});

const fs = require("fs");

fs.readFile("../../data/day1.txt", (err, data) => {
  const unorderedLeft = [];
  const unorderedRight = [];
  data
    .toString()
    .split("\n")
    .slice(0, -1)
    .forEach((row) => {
      const [l, r] = row.split("   ");
      unorderedLeft.push(l);
      unorderedRight.push(r);
    });

  const orderedLeft = unorderedLeft.sort((a, b) => a - b);
  const orderedRight = unorderedRight.sort((a, b) => a - b);

  const diff = orderedLeft.map((l, i) => Math.abs(l - orderedRight[i]));
  const sum = diff.reduce((acc, curr) => acc + curr, 0);

  console.log(sum);
});

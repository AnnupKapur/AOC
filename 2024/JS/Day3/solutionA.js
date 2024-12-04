const fs = require("fs");

fs.readFile("../../data/day3.txt", (err, data) => {
  const regex = /mul\(\d+,\d+\)/g;
  let input = data.toString();
  const result = input.match(regex).reduce((acc, item) => {
    const [a, b] = item
      .slice(4, -1)
      .split(",")
      .map((x) => parseInt(x));
    return acc + a * b;
  }, 0);
  console.log(result);
});

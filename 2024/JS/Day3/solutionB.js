const fs = require("fs");

fs.readFile("../../data/day3.txt", (err, data) => {
  let input = data.toString();
  const r = /(?=do\(\))|(?=don't\(\))/;
  const list = input
    .split(r)
    .filter((x, i) => x.slice(0, 4) === "do()" || i === 0)
    .join();

  const regex = /mul\(\d+,\d+\)/g;
  const result = list.match(regex).reduce((acc, item) => {
    const [a, b] = item
      .slice(4, -1)
      .split(",")
      .map((x) => parseInt(x));
    return acc + a * b;
  }, 0);

  console.log(result);
});

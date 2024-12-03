const fs = require("fs");

const isValidIncrease = (line) => {
  if (line.length === 1) return true;
  if (line[0] - line[1] >= -3 && line[0] - line[1] < 0)
    return isValidIncrease(line.slice(1));
  return false;
};

const isValidDecrease = (line) => {
  if (line.length === 1) return true;
  if (line[0] - line[1] <= 3 && line[0] - line[1] > 0)
    return isValidDecrease(line.slice(1));
  return false;
};

fs.readFile("../../data/day2.txt", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.toString().split("\n").slice(0, -1);
  const res = lines.reduce((acc, l) => {
    const line = l.split(" ");
    if (isValidIncrease(line) || isValidDecrease(line)) {
      return acc + 1;
    }

    let dampener = false;
    line.forEach((_n, i) => {
      const newLine = line.slice(0, i).concat(line.slice(i + 1));
      if (isValidIncrease(newLine) || isValidDecrease(newLine)) {
        dampener = true;
        return;
      }
    });

    if (dampener) return acc + 1;

    return acc;
  }, 0);

  console.log(`Result: ${res}`);
});

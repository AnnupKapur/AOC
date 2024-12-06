const fs = require("fs");

function countXMAS(grid) {
  let count = 0;

  const word = "MAS";
  const wordReversed = "SAM";

  grid.forEach((row, r) => {
    row.split("").forEach((char, c) => {
      let downRight = grid[r][c] + grid[r + 1]?.[c + 1] + grid[r + 2]?.[c + 2];
      let downLeft = grid[r][c + 2] + grid[r + 1]?.[c + 1] + grid[r + 2]?.[c];
      if (downRight.length !== 3 || downLeft.length !== 3) return;
      if (
        (downRight === word || downRight === wordReversed) &&
        (downLeft === word || downLeft === wordReversed)
      ) {
        count++;
      }
    });
  });

  return count;
}

fs.readFile("../../data/day4.txt", (err, data) => {
  let input = data.toString();
  console.log(countXMAS(input.split("\n")));
});

const fs = require("fs");

function countXMAS(grid) {
  const word = "XMAS";
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  // Directions (right, left, down, up, diagonals)
  const directions = [
    { r: 0, c: 1 }, // right
    { r: 0, c: -1 }, // left
    { r: 1, c: 0 }, // down
    { r: -1, c: 0 }, // up
    { r: 1, c: 1 }, // down-right diagonal
    { r: -1, c: -1 }, // up-left diagonal
    { r: 1, c: -1 }, // down-left diagonal
    { r: -1, c: 1 }, // up-right diagonal
  ];

  // check if the word can be found in the given direction
  function checkDirection(r, c, dr, dc) {
    for (let i = 0; i < word.length; i++) {
      const nr = r + dr * i;
      const nc = c + dc * i;
      if (
        nr < 0 ||
        nr >= rows ||
        nc < 0 ||
        nc >= cols ||
        grid[nr][nc] !== word[i]
      ) {
        return false;
      }
    }
    return true;
  }

  // Loop over each cell in the grid
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const dir of directions) {
        if (checkDirection(r, c, dir.r, dir.c)) {
          count++;
        }
      }
    }
  }

  return count;
}

fs.readFile("../../data/day4.txt", (err, data) => {
  let input = data.toString();
  console.log(countXMAS(input.split("\n")));
});

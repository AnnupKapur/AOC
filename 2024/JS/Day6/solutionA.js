const fs = require("fs");

const getLocation = (grid, char) => {
  let row = 0;
  let col = 0;

  for (let i = 0; i < grid.length; i++) {
    if (grid[i].includes(char)) {
      row = i;
      col = grid[i].indexOf(char);
      break;
    }
  }

  return { row, col };
};

const walk = (grid, startLoc) => {
  let newGrid = grid.map((row) => [...row]);
  const obstacle = "#";
  const directions = {
    N: { r: -1, c: 0 },
    E: { r: 0, c: 1 },
    S: { r: 1, c: 0 },
    W: { r: 0, c: -1 },
  };
  let rotations = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
  };
  let currentDirection = "N";
  let currentLocation = startLoc;

  let continueWalk = true;
  while (continueWalk) {
    let nextLocation = {
      row: currentLocation.row + directions[currentDirection].r,
      col: currentLocation.col + directions[currentDirection].c,
    };

    // break if next location is out of bounds
    if (
      nextLocation.row < 0 ||
      nextLocation.row >= grid.length ||
      nextLocation.col < 0 ||
      nextLocation.col >= grid[0].length
    ) {
      continueWalk = false;
      break;
    }

    // turn 90 degrees to the right if next location is an obstacle
    if (newGrid[nextLocation.row][nextLocation.col] === obstacle) {
      currentDirection = rotations[currentDirection];
      continue;
    }

    // mark the current location as visited
    newGrid[currentLocation.row][currentLocation.col] = "X";

    // move to next location
    currentLocation = nextLocation;
  }

  return newGrid.flatMap((row) => row).filter((cell) => cell === "X").length;
};

fs.readFile("../../data/day6.txt", (err, data) => {
  let input = data.toString();
  let grid = input.split("\n").map((row) => row.split(""));
  const { row, col } = getLocation(grid, "^");
  console.log(walk(grid, { row, col }));
});

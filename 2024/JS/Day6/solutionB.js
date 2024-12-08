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

printGrid = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    console.log(grid[i].join(""));
  }
};

const walk = (grid, startLoc) => {
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
  let count = 0;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let currentDirection = "N";
      let currentLocation = startLoc;
      if (grid[i][j] === obstacle || grid[i][j] === "^") {
        continue;
      }

      let visited = new Set();

      let tempGrid = grid.map((row) => [...row]);
      tempGrid[i][j] = obstacle;

      let continueWalk = true;
      while (continueWalk) {
        let nextLocation = {
          row: currentLocation.row + directions[currentDirection].r,
          col: currentLocation.col + directions[currentDirection].c,
        };

        let currentStep = `${currentLocation.row},${currentLocation.col},${currentDirection}`;
        visited.add(currentStep);

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
        if (tempGrid[nextLocation.row][nextLocation.col] === obstacle) {
          currentDirection = rotations[currentDirection];
          continue;
        }

        tempGrid[currentLocation.row][currentLocation.col] = currentDirection;

        let nextStep = `${nextLocation.row},${nextLocation.col},${currentDirection}`;

        if (
          Object.keys(rotations).includes(currentDirection) &&
          visited.has(nextStep)
        ) {
          count++;
          continueWalk = false;
          break;
        }

        printGrid(tempGrid);
        console.clear();

        // update the current current location
        currentLocation = nextLocation;
      }
    }
  }

  return count;
};

fs.readFile("../../data/day6.txt", (err, data) => {
  let input = data.toString();
  let grid = input.split("\n").map((row) => row.split(""));
  const { row, col } = getLocation(grid, "^");
  console.log(walk(grid, { row, col }));
});

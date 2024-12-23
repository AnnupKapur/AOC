const fs = require("fs");

function parseInput(input) {
  return input
    .split("\n")
    .filter((line) => line !== "")
    .map((line) => line.split("").map((char) => parseInt(char)));
}

function findAllZeros(parsedInput) {
  let nines = [];
  for (let y = 0; y < parsedInput.length; y++) {
    for (let x = 0; x < parsedInput[y].length; x++) {
      if (parsedInput[y][x] === 0) {
        nines.push({ r: y, c: x });
      }
    }
  }
  return nines;
}

function findNextPoints(parsedInput, currentPoint) {
  let nextPoints = [];
  let currentChar = parsedInput[currentPoint.r][currentPoint.c];
  let r = currentPoint.r;
  let c = currentPoint.c;
  let rows = parsedInput.length;
  let cols = parsedInput[0].length;
  if (r - 1 >= 0 && parsedInput[r - 1][c] === currentChar + 1) {
    nextPoints.push({ r: r - 1, c });
  }
  if (r + 1 < rows && parsedInput[r + 1][c] === currentChar + 1) {
    nextPoints.push({ r: r + 1, c });
  }
  if (c - 1 >= 0 && parsedInput[r][c - 1] === currentChar + 1) {
    nextPoints.push({ r, c: c - 1 });
  }
  if (c + 1 < cols && parsedInput[r][c + 1] === currentChar + 1) {
    nextPoints.push({ r, c: c + 1 });
  }
  return nextPoints;
}

function serializeLoc(point) {
  return `${point.r},${point.c}`;
}

function findPath(parsedInput, currentloc, path, paths) {
  let char = parsedInput[currentloc.r][currentloc.c];
  let dataPoint = { r: currentloc.r, c: currentloc.c, char: char };
  path.push(dataPoint);
  console.log(serializeLoc(dataPoint));
  if (char === 9) {
    let filteredPaths = paths.filter(
      (p) =>
        serializeLoc(p[p.length - 1]) === serializeLoc(path[path.length - 1]) &&
        serializeLoc(p[0]) === serializeLoc(path[0]),
    );
    if (filteredPaths.length === 0) {
      paths.push(path);
      return;
    }
  }
  let nextPoints = findNextPoints(parsedInput, currentloc);
  for (let i = 0; i < nextPoints.length; i++) {
    findPath(parsedInput, nextPoints[i], [...path], paths);
  }
}

fs.readFile("../../data/day10.txt", (err, data) => {
  let input = data.toString();
  let parsedInput = parseInput(input);
  let startPoints = findAllZeros(parsedInput);
  let totalPaths = [];
  for (const x in startPoints) {
    let paths = [];
    findPath(parsedInput, startPoints[x], [], paths);
    totalPaths.push(...paths);
  }
  console.log(totalPaths.length);
});

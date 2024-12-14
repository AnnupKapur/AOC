const fs = require("fs");

function countAntinodes(mapInput) {
  const map = mapInput
    .split("\n")
    .slice(0, -1)
    .map((line) => line.split(""));
  const rows = map.length;
  const cols = map[0].length;
  const antennas = {};

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = map[row][col];
      if (cell !== ".") {
        if (!antennas[cell]) {
          antennas[cell] = [];
        }
        antennas[cell].push([row, col]);
      }
    }
  }

  const antinodeSet = new Set();

  for (const [frequency, positions] of Object.entries(antennas)) {
    const len = positions.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (i === j) continue;

        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];

        const dr = r2 - r1;
        const dc = c2 - c1;

        const r3 = r1 - dr;
        const c3 = c1 - dc;
        const r4 = r2 + dr;
        const c4 = c2 + dc;

        // Add antinodes if they are within bounds
        if (r3 >= 0 && r3 < rows && c3 >= 0 && c3 < cols) {
          antinodeSet.add(`${r3},${c3}`);
        }
        if (r4 >= 0 && r4 < rows && c4 >= 0 && c4 < cols) {
          antinodeSet.add(`${r4},${c4}`);
        }
      }
    }
  }

  return antinodeSet.size;
}

fs.readFile("../../data/day8.txt", (err, data) => {
  let input = data.toString();
  console.log(countAntinodes(input));
});

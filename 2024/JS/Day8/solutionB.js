const fs = require("fs");

const checkWithinBounds = (r, c, rows, cols) => {
  return r >= 0 && r < rows && c >= 0 && c < cols;
};

function countAntinodes(input) {
  const map = input
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

  const antennasLookup = new Set(
    Object.values(antennas)
      .flat()
      .map((pos) => pos.join(",")),
  );

  const antinodeSet = new Set();

  for (const [frequency, positions] of Object.entries(antennas)) {
    const len = positions.length;

    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (i === j) continue;

        const [r1, c1] = positions[i];
        const [r2, c2] = positions[j];

        const rDiff = r2 - r1;
        const cDiff = c2 - c1;

        let r3 = r1 - rDiff;
        let c3 = c1 - cDiff;
        let r4 = r2 + rDiff;
        let c4 = c2 + cDiff;

        if (
          checkWithinBounds(r3, c3, rows, cols) &&
          !antennasLookup.has(`${r3},${c3}`)
        ) {
          antinodeSet.add(`${r3},${c3}`);
        }
        while (checkWithinBounds(r3, c3, rows, cols)) {
          if (!antennasLookup.has(`${r3},${c3}`)) {
            antinodeSet.add(`${r3},${c3}`);
          }
          r3 -= rDiff;
          c3 -= cDiff;
        }

        if (
          checkWithinBounds(r4, c4, rows, cols) &&
          !antennasLookup.has(`${r4},${c4}`)
        ) {
          antinodeSet.add(`${r4},${c4}`);
        }
        while (checkWithinBounds(r4, c4, rows, cols)) {
          if (!antennasLookup.has(`${r4},${c4}`)) {
            antinodeSet.add(`${r4},${c4}`);
          }
          r4 += rDiff;
          c4 += cDiff;
        }
      }
    }
  }

  return antinodeSet.size + antennasLookup.size;
}

fs.readFile("../../data/day8.txt", (err, data) => {
  let input = data.toString();
  console.log(countAntinodes(input));
});

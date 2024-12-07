const fs = require("fs");

function isUpdateValid(update, rules) {
  const pageIndex = new Map();
  update.forEach((page, idx) => pageIndex.set(page, idx));

  for (const [x, y] of rules) {
    if (
      pageIndex.has(x) &&
      pageIndex.has(y) &&
      pageIndex.get(x) > pageIndex.get(y)
    ) {
      return false;
    }
  }
  return true;
}

function findMiddlePage(update) {
  const middleIndex = Math.floor(update.length / 2);
  return update[middleIndex];
}

function solveChallenge(input) {
  const [rulesSection, updatesSection] = input.trim().split("\n\n");
  const rules = rulesSection
    .split("\n")
    .map((rule) => rule.split("|").map(Number));
  const updates = updatesSection
    .split("\n")
    .map((update) => update.split(",").map(Number));

  let total = 0;

  for (const update of updates) {
    if (isUpdateValid(update, rules)) {
      total += findMiddlePage(update);
    }
  }

  return total;
}

fs.readFile("../../data/day5.txt", (err, data) => {
  let input = data.toString();
  console.log(solveChallenge(input));
});

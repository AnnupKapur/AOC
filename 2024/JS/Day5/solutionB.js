const fs = require("fs");

function sortPages(pages, rules) {
  const graph = new Map();
  const inDegree = new Map();

  for (const page of pages) {
    graph.set(page, []);
    inDegree.set(page, 0);
  }

  for (const [x, y] of rules) {
    if (graph.has(x) && graph.has(y)) {
      graph.get(x).push(y);
      inDegree.set(y, inDegree.get(y) + 1);
    }
  }

  const queue = [];
  for (const [node, degree] of inDegree) {
    if (degree === 0) queue.push(node);
  }

  const sorted = [];
  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const neighbor of graph.get(current)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return sorted;
}

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
    if (!isUpdateValid(update, rules)) {
      // Reorder the incorrect update
      const sortedUpdate = sortPages(update, rules);
      total += findMiddlePage(sortedUpdate);
    }
  }

  return total;
}

fs.readFile("../../data/day5.txt", (err, data) => {
  let input = data.toString();
  console.log(solveChallenge(input));
});

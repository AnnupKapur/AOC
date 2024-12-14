const fs = require("fs");

function createDiskMap(input) {
  return input
    .split("")
    .filter((char) => char !== "\n")
    .reduce((acc, char, idx) => {
      let count = parseInt(char);
      let arrayFill = idx % 2 > 0 ? "." : idx / 2;
      return [...acc, ...Array(count).fill(arrayFill)];
    }, []);
}

function fillEmptyBlocks(diskMap) {
  let newDiskMap = diskMap;
  let filteredMap = diskMap.filter((char) => char !== ".");

  while (filteredMap.length > 0) {
    let idx = newDiskMap.indexOf(".");
    newDiskMap[idx] = filteredMap.pop();
    for (let i = newDiskMap.length - 1; i >= 0; i--) {
      if (newDiskMap[i] !== ".") {
        newDiskMap[i] = ".";
        break;
      }
    }
    console.log(filteredMap.length);
  }
  return newDiskMap;
}

function calculateChecksum(input) {
  let diskMap = createDiskMap(input);
  let filledDiskMap = fillEmptyBlocks(diskMap);
  let checksum = filledDiskMap.reduce((acc, char, idx) => {
    if (char === ".") return acc;
    return acc + idx * parseInt(char);
  }, 0);
  return checksum;
}

fs.readFile("../../data/day9.txt", (err, data) => {
  let input = data.toString();
  console.log("Result: ", calculateChecksum(input));
});

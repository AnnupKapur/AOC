const fs = require("fs");

function createDiskMap(input) {
  return input
    .split("")
    .filter((char) => char !== "\n")
    .reduce((acc, char, idx) => {
      let count = parseInt(char);
      if (idx % 2 > 0) {
        return [...acc, Array(count).fill(".").join("")];
      }
      return [...acc, Array(count).fill(idx / 2)];
    }, [])
    .filter((x) => x.length > 0);
}

function fillEmptyBlocks(input) {
  let diskMap = createDiskMap(input);
  let exclusiveFiles = diskMap.filter((x) => !x.includes(".") && x.length > 0);
  let flatDiskMap = [...diskMap];

  for (let i = exclusiveFiles.length - 1; i >= 1; i--) {
    console.log(i);
    let file = exclusiveFiles[i];
    let idx = flatDiskMap.findIndex(
      (x) => x.includes(".") && x.length >= file.length,
    );

    let idxFile = [...flatDiskMap].findIndex((x) => x === file);
    if (idx !== -1 && idxFile > idx) {
      let newMap = [
        ...flatDiskMap.slice(0, idx),
        file,
        Array(flatDiskMap[idx].length - file.length)
          .fill(".")
          .join(""),
        ...flatDiskMap.slice(idx + 1, idxFile),
        Array(file.length).fill(".").join(""),
        ...flatDiskMap.slice(idxFile + 1),
      ];
      flatDiskMap = newMap;
    }
  }

  return flatDiskMap;
}

function calculateChecksum(input) {
  let filledDiskMap = fillEmptyBlocks(input)
    .flatMap((x) => (x.includes(".") ? x.split("") : x))
    .filter((x) => x !== "");
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

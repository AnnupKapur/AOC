function splitRow(row) {
  return row.split(" ").map((x) => parseInt(x));
}

function joinRow(row) {
  return row.join(" ");
}

function checkEvenLengthDigits(num) {
  return `${num}`.length % 2 === 0;
}

function splitEvenDigits(num) {
  let numStr = `${num}`;
  let half = numStr.length / 2;
  return [parseInt(numStr.slice(0, half)), parseInt(numStr.slice(half))];
}

function blinkOnce(row) {
  let newRow = [];
  for (const x in row) {
    if (row[x] === 0) {
      newRow.push(1);
    } else if (checkEvenLengthDigits(row[x])) {
      newRow.push(...splitEvenDigits(row[x]));
    } else {
      newRow.push(row[x] * 2024);
    }
  }
  console.log(row.length);
  console.log("");
  return newRow;
}

function blinkNTimes(row, n) {
  for (let i = 0; i < n; i++) {
    console.log("Blink: ", i);
    row = blinkOnce(row);
  }
  return row;
}

module.exports = {
  splitRow,
  joinRow,
  checkEvenLengthDigits,
  splitEvenDigits,
  blinkOnce,
  blinkNTimes,
};

const fs = require("fs");

function parseInput(input) {
  let parsed = [];
  let rows = input.split("\n");
  for (const row of rows) {
    if (row === "") {
      continue;
    }
    let [res, values] = row.split(":");
    parsedRow = [parseInt(res)];
    parsedRow.push(
      values
        .trim()
        .split(" ")
        .map((value) => parseInt(value)),
    );
    parsed.push(parsedRow);
  }
  return parsed;
}

function calculateAnswer(equation) {
  let res = 1;
  let op = "*";
  for (let i = 0; i < equation.length; i++) {
    if (equation[i] === "+" || equation[i] === "*") {
      op = equation[i];
    } else {
      if (op === "+") {
        res += equation[i];
      } else {
        res *= equation[i];
      }
    }
  }
  return res;
}

function operatorPermutations(rowLength) {
  if (rowLength === 0) {
    return [""];
  }

  const shorterStrings = operatorPermutations(rowLength - 1);
  const result = [];

  for (const str of shorterStrings) {
    result.push("*" + str);
    result.push("+" + str);
  }

  return result;
}

function checkEvaluations(parsed) {
  let sum = 0;

  parsed.forEach(([total, values]) => {
    let operatorList = operatorPermutations(values.length - 1);
    for (let i = 0; i < operatorList.length; i++) {
      let equation = values.reduce((acc, num, idx) => {
        if (idx !== 0) {
          acc.push(operatorList[i][idx - 1]);
        }
        acc.push(num);
        return acc;
      }, []);
      let ans = calculateAnswer(equation);
      console.log(total, " :: ", equation.join(" "), " = ", ans);
      if (total === ans) {
        sum += ans;
        break;
      }
    }
  });

  return sum;
}

fs.readFile("../../data/day7.txt", (err, data) => {
  let input = data.toString();
  console.log(checkEvaluations(parseInput(input)));
});

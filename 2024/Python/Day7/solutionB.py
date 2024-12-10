def parse_input(input):
    parsed = []
    rows = input.split("\n")
    for row in rows:
        if row == "":
            continue
        [res, values] = row.split(":")
        parsedValues = []
        for value in values.strip().split(" "):
            parsedValues.append(int(value))
        parsed.append((int(res), parsedValues))
    return parsed

def operator_permutations(row_length):
    if row_length == 0:
        return [""]

    short = operator_permutations(row_length - 1)
    result = []
    for s in short:
        result.append(s + "+")
        result.append(s + "*")
        result.append(s + "|")
    return result

def evalute_equation(equation):
    result = 1
    operator = "*"
    for pos in equation:
        if pos == "+" or pos == "*" or pos == "|":
            operator = pos
        else:
            if operator == "+":
                result += pos
            elif operator == "*":
                result *= pos
            else:
                result = int(f"{result}{pos}")
    return result

def evaluate_check_rows(parsed):
    result_sum = 0

    for [total, values] in parsed:
        operator_list = operator_permutations(len(values) - 1)
        for idx, op in enumerate(operator_list):
            equation = []
            for idx_values, x in enumerate(values):
                if idx_values == 0:
                    equation.append(x)
                else:
                    equation.append(op[idx_values-1])
                    equation.append(x)
            ans = evalute_equation(equation)
            print(f"{total} :: {equation} = {ans}")
            if total==ans:
                result_sum += ans
                break

    return result_sum

data = ""
with open("../../data/day7.txt") as file:
    for line in file:
        data += line

print(evaluate_check_rows(parse_input(data)))

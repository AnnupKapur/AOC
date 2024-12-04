import re

input_data = []

regex_do_dont = r"(?=do\(\))|(?=don't\(\))"
regex_mul = r"mul\(\d+,\d+\)";

with open("../../data/day3.txt") as file:
    for line in file:
        input_data.append(line)

raw = "".join(input_data)
data = re.split(regex_do_dont, raw)
filtered = [data[0]]
for x in filter(lambda x: x[0:4] == "do()", data):
    filtered.append(x)

multiplication_results = []
for line in filtered:
    for instance in re.findall(regex_mul, line):
        [a,b] = instance[4:-1].split(",")
        multiplication_results.append(int(a) * int(b))

print(sum(multiplication_results))

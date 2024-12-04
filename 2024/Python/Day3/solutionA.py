import re

data = []

regex = r"mul\(\d+,\d+\)";
with open("../../data/day3.txt") as file:
    for line in file:
        for instance in re.findall(regex, line):
            [a,b] = instance[4:-1].split(",")
            data.append(int(a) * int(b))

print(sum(data))

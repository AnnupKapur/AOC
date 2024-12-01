left = []
right = []

with open("../../data/day1.txt") as file:
    for line in file:
        [l, r] = line.rstrip('\n').split("   ")
        left.append(int(l))
        right.append(int(r))

left.sort()
right.sort()

diffs = []

for i, l in enumerate(left):
    diffs.append(abs(right[i] - l))

print(sum(diffs))

left = []
right = []

with open("../../data/day1.txt") as file:
    for line in file:
        [l, r] = line.rstrip('\n').split("   ")
        left.append(int(l))
        right.append(int(r))

left.sort()
right.sort()

ref = {}
multiples = []

for l in left:
    if l in ref:
        multiples.append(l * ref[l])
    else:
        ref[l] = right.count(l)
        multiples.append(l * ref[l])

print(sum(multiples))

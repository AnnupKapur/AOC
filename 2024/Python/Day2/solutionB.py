def is_valid_increase(line):
    if (len(line) == 1):
        return True
    if (line[0] - line[1] >= -3 and line[0] - line[1] < 0): 
        return is_valid_increase(line[1:])
    return False

def is_valid_decrease(line):
    if (len(line) == 1):
        return True
    if (line[0] - line[1] <= 3 and line[0] - line[1] > 0): 
        return is_valid_decrease(line[1:])
    return False

count = 0
with open("../../data/day2.txt") as file:
    for line in file:
        l = [int(num) for num in line.rstrip('\n').split()]
        if (is_valid_increase(l) or is_valid_decrease(l)):
            count += 1
            continue
        
        dampener = False
        for i in range(0, len(l)):
            newList = l[:i] + l[i+1:]
            if (is_valid_increase(newList) or is_valid_decrease(newList)):
                dampener = True
                break

        if (dampener == True):
            count += 1


print(f"Solution: {count}")

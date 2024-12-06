def countXMAS(grid):
    word = "XMAS"
    rows = len(grid)
    cols = len(grid[0])
    count = 0

    directions = [
        (0, 1), # right
        (0, -1), # left
        (1, 0), # down
        (-1, 0), # up
        (1, 1), # down-right
        (-1, -1), # up-left
        (1, -1), # down-left
        (-1, 1), # up-right
    ]

    def checkDirection(row, col, dr, dc):
        for i in range(len(word)):
            nr = row + i * dr 
            nc = col + i * dc 
            if nr < 0 or nr >= rows or nc < 0 or nc >= cols or grid[nr][nc] != word[i]:
                return False
        return True

    for r in range(rows):
        for c in range(cols):
            for dr, dc in directions:
                if checkDirection(r, c, dr, dc):
                    count += 1

    return count 


grid = []
with open("../../data/day4.txt") as file:
    for line in file:
        grid.append(line.rstrip('\n'))

result = countXMAS(grid)
print(result)

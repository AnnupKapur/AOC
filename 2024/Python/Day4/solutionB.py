def countXMAS(grid):
    count = 0
    word = "MAS"
    word_reversed = "SAM"

    for r_idx, row in enumerate(grid):
        for c_idx, _char in enumerate(row):
            if c_idx + 2 >= len(row):
                continue
            if r_idx + 2 >= len(grid):
                continue

            down_right = grid[r_idx][c_idx] + grid[r_idx + 1][c_idx + 1] + grid[r_idx + 2][c_idx + 2]
            down_left = grid[r_idx][c_idx+2] + grid[r_idx + 1][c_idx + 1] + grid[r_idx + 2][c_idx]

            if len(down_right) != 3 or len(down_left) != 3:
                continue

            if (down_right == word or down_right == word_reversed) and (down_left == word or down_left == word_reversed):
                count += 1
    
    return count 

grid = []
with open("../../data/day4.txt") as file:
    for line in file:
        grid.append(line.rstrip('\n'))

result = countXMAS(grid)
print(result)

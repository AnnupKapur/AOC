import os

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

# print a visual representation of the current of the grid
def print_grid(grid):
    clear_screen()
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            print(grid[i][j], end="")
        print()

# print a progress bar
def print_progress_bar(length, current_pos):
    row_progress_bar = "[ "
    for i in range(length):
        if i == current_pos:
            row_progress_bar += ">"
        elif i < current_pos:
            row_progress_bar += "#"
        else:
            row_progress_bar += "_"
    row_progress_bar += " ]"
    print(row_progress_bar)

# print the progress of the current row and column
def print_progress(row, row_pos, col, col_pos, current_count = 0):
    clear_screen()
    print_progress_bar(row, row_pos)
    print_progress_bar(col, col_pos)
    print("--------------------")
    print(f"Count: {current_count}")
    print("--------------------")

# get the location of a character in the grid
def get_location(grid, char):
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == char:
                return {"row": i, "col": j}
    return None

# check if the location is out of bounds
def check_out_of_bounds(grid, location):
    if location["row"] < 0 or location["row"] >= len(grid) or location["col"] < 0 or location["col"] >= len(grid[0]):
        return True
    return False

# simulate the walk around the grid
def simulate_walk(grid):
    obstacle = "#"
    directions = {
        "N": {"r": -1, "c": 0},
        "E": {"r": 0, "c": 1},
        "S": {"r": 1, "c": 0},
        "W": {"r": 0, "c": -1}
    }
    rotations = {
        "N": "E",
        "E": "S",
        "S": "W",
        "W": "N"
    }

    count = 0

    for i in range(len(grid)):
        for j in range(len(grid[i])):
            current_direction = "N"
            current_location = get_location(grid, "^")

            if grid[i][j] == obstacle or grid[i][j] == "^":
                continue

            visited = set()

            temp_grid = []
            for row in grid:
                temp_grid.append(row.copy())
            temp_grid[i][j] = obstacle

            print_progress(len(grid), i, len(grid[i]), j, count)

            continue_walk = True
            while continue_walk == True:
                next_location = {
                    "row": current_location["row"] + directions[current_direction]["r"],
                    "col": current_location["col"] + directions[current_direction]["c"]
                }

                current_step = f"{current_location['row']},{current_location['col']},{current_direction}"
                visited.add(current_step)
            
                if check_out_of_bounds(temp_grid, next_location):
                    continue_walk = False
                    break
            
                if temp_grid[next_location["row"]][next_location["col"]] == obstacle:
                    current_direction = rotations[current_direction]
                    continue 

                temp_grid[current_location["row"]][current_location["col"]] = current_direction
                next_step = f"{next_location['row']},{next_location['col']},{current_direction}"

                if next_step in visited and current_direction in rotations:
                    print("X")
                    count += 1
                    continue_walk = False
                    break

                current_location = next_location

    return count

grid = []
with open("../../data/day6.txt") as file:
    for line in file:
        grid.append(list(line))

result = simulate_walk(grid)
print(result)


def get_location(grid, char):
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == char:
                return {"row": i, "col": j}
    return None

def check_out_of_bounds(grid, location):
    if location["row"] < 0 or location["row"] >= len(grid) or location["col"] < 0 or location["col"] >= len(grid[0]):
        return True
    return False

def count_char(grid, char):
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[i])):
            if grid[i][j] == char:
                count += 1
    return count

def simulate_walk(grid):
    obstacle = "#"
    current_direction = "N"
    current_location = get_location(grid, "^")
    rotations = {
        "N": "E",
        "E": "S",
        "S": "W",
        "W": "N"
    }
    directions = {
        "N": {"r": -1, "c": 0},
        "E": {"r": 0, "c": 1},
        "S": {"r": 1, "c": 0},
        "W": {"r": 0, "c": -1}
    }

    continue_walk = True
    while continue_walk:
        grid[current_location["row"]][current_location["col"]] = "X"

        next_location = {
            "row": current_location["row"] + directions[current_direction]["r"],
            "col": current_location["col"] + directions[current_direction]["c"]
        }

        if check_out_of_bounds(grid, next_location):
            continue_walk = False
            break

        if grid[next_location["row"]][next_location["col"]] == obstacle:
            current_direction = rotations[current_direction]
            continue 

        current_location = next_location

    return count_char(grid, "X")

grid = []
with open("../../data/day6.txt") as file:
    for line in file:
        grid.append(list(line))

result = simulate_walk(grid)
print(result)

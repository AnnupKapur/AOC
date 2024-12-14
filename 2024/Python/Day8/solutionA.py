# parse raw data into dictionary
def parse_data(data):
    rows_data = data.split("\n")[:-1]
    cols_data = list(data.split("\n")[0])
    parsed = {}
    for row in range(len(rows_data)):
        for col in range(len(cols_data)):
            cell = rows_data[row][col]
            if cell != ".":
                if cell not in parsed:
                    parsed[cell] = []
                parsed[cell].append((row, col))

    return parsed

# check if the cell is within the bounds of the grid
def in_bounds(r, c, rows, cols):
    return r >= 0 and r < rows and c >= 0 and c < cols

# count the number of antinodes
def count_antinodes(data):
    rows = len(data.split("\n")[:-1])
    cols = len(list(data.split("\n")[0]))
    antennas = parse_data(data)
    antinodes = []

    for antenna in antennas:
        length = len(antennas[antenna])

        for i in range(length):
            for j in range(length):
                if i == j:
                    continue
                
                (r1, c1) = antennas[antenna][i]
                (r2, c2) = antennas[antenna][j]

                dr = r2 - r1
                dc = c2 - c1

                r3 = r1 - dr 
                c3 = c1 - dc 

                r4 = r2 + dr 
                c4 = c2 + dc 

                if in_bounds(r3, c3, rows, cols):
                    antinodes.append(f"{r3},{c3}")

                if in_bounds(r4, c4, rows, cols):
                    antinodes.append(f"{r4},{c4}")

    return len(set(antinodes))

data = ""
with open("../../data/day8.txt") as file:
    for line in file:
        data += line

print(count_antinodes(data))

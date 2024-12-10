use std::collections::HashSet;
use std::fs::File;
use std::io::{BufRead, BufReader};

fn parse_input(lines: Vec<String>) -> (Vec<Vec<char>>, (usize, usize), (i32, i32)) {
    let grid: Vec<Vec<char>> = lines.iter().map(|line| line.chars().collect()).collect();
    let mut start_position = (0, 0);
    let mut direction = (0, 0);

    // Find the starting position and initial direction
    for (y, row) in grid.iter().enumerate() {
        for (x, &cell) in row.iter().enumerate() {
            if "^v<>".contains(cell) {
                start_position = (x, y);
                direction = match cell {
                    '^' => (0, -1),
                    'v' => (0, 1),
                    '<' => (-1, 0),
                    '>' => (1, 0),
                    _ => unreachable!(),
                };
            }
        }
    }

    (grid, start_position, direction)
}

fn simulate_walk(
    grid: &[Vec<char>],
    start_position: (usize, usize),
    start_direction: (i32, i32),
) -> usize {
    let mut visited_positions = HashSet::new();
    let mut position = start_position;
    let mut direction = start_direction;
    let rows = grid.len();
    let cols = grid[0].len();

    // Mark the starting position as visited
    visited_positions.insert(position);

    // Direction changes for turning right: up -> right -> down -> left
    let directions = [(0, -1), (1, 0), (0, 1), (-1, 0)];

    loop {
        let (dx, dy) = direction;
        let (x, y) = position;

        // Calculate the next position
        let next_x = x as i32 + dx;
        let next_y = y as i32 + dy;

        // Check if the next position is out of bounds
        if next_x < 0 || next_y < 0 || next_x >= cols as i32 || next_y >= rows as i32 {
            break;
        }

        let next_position = (next_x as usize, next_y as usize);

        // Hit an obstacle, turn right
        if grid[next_position.1][next_position.0] == '#' {
            let current_direction_index = directions.iter().position(|&d| d == direction).unwrap();
            direction = directions[(current_direction_index + 1) % directions.len()];
        } else {
            // Move forward
            position = next_position;
            visited_positions.insert(position);
        }
    }

    visited_positions.len()
}

fn simulate_walk_check_loops(
    grid: &[Vec<char>],
    start_position: (usize, usize),
    start_direction: (i32, i32),
    obstruction: Option<(usize, usize)>,
) -> bool {
    let mut visited = HashSet::new();
    let mut position = start_position;
    let mut direction = start_direction;
    let rows = grid.len();
    let cols = grid[0].len();

    // Place the obstruction if specified
    let mut temp_grid = grid.to_vec();
    if let Some((ox, oy)) = obstruction {
        temp_grid[oy][ox] = '#';
    }

    loop {
        // Detect a loop
        if !visited.insert((position, direction)) {
            return true; // A loop is detected
        }

        let (dx, dy) = direction;
        let (x, y) = position;

        // Calculate the next position
        let next_x = x as i32 + dx;
        let next_y = y as i32 + dy;

        if next_x < 0 || next_y < 0 || next_x >= cols as i32 || next_y >= rows as i32 {
            return false; // Guard has left the map
        }

        let next_position = (next_x as usize, next_y as usize);

        if temp_grid[next_position.1][next_position.0] == '#' {
            // Turn right 90 degrees
            let directions = [(0, -1), (1, 0), (0, 1), (-1, 0)];
            let current_direction_index = directions.iter().position(|&d| d == direction).unwrap();
            direction = directions[(current_direction_index + 1) % directions.len()];
        } else {
            // Move forward
            position = next_position;
        }
    }
}

fn simulate_new_obstables(
    grid: &[Vec<char>],
    start_position: (usize, usize),
    start_direction: (i32, i32),
) -> usize {
    let mut count = 0;

    // Try placing an obstruction at every valid empty cell
    for (y, row) in grid.iter().enumerate() {
        for (x, &cell) in row.iter().enumerate() {
            if cell == '.' && (x, y) != start_position {
                if simulate_walk_check_loops(grid, start_position, start_direction, Some((x, y))) {
                    count += 1;
                }
            }
        }
    }

    count
}

pub fn solution_a() {
    let reader = BufReader::new(File::open("data/day6.txt").expect("Cannot open file.txt"));

    let mut data = Vec::new();
    for line in reader.lines() {
        let line = line.unwrap();
        data.push(line);
    }

    let (grid, start_position, start_direction) = parse_input(data);
    let result = simulate_walk(&grid, start_position, start_direction);

    println!("Solution A: {:?}", result);

}

pub fn solution_b() {
    let reader = BufReader::new(File::open("data/day6.txt").expect("Cannot open file.txt"));

    let mut data = Vec::new();
    for line in reader.lines() {
        let line = line.unwrap();
        data.push(line);
    }

    let (grid, start_position, start_direction) = parse_input(data);
    let result = simulate_new_obstables(&grid, start_position, start_direction);

    println!("Solution B: {:?}", result);

}

use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn count_xmas(grid: &Vec<Vec<char>>, word: &str) -> usize {
    let directions = [
        (0, 1),   // Right
        (1, 0),   // Down
        (1, 1),   // Diagonal Down-Right
        (1, -1),  // Diagonal Down-Left
        (0, -1),  // Left
        (-1, 0),  // Up
        (-1, -1), // Diagonal Up-Left
        (-1, 1),  // Diagonal Up-Right
    ];

    let word_len = word.len();
    let word_chars: Vec<char> = word.chars().collect();
    let mut count = 0;

    for i in 0..grid.len() {
        for j in 0..grid[i].len() {
            for &(dx, dy) in &directions {
                let mut found = true;

                for k in 0..word_len {
                    let x = i as isize + k as isize * dx;
                    let y = j as isize + k as isize * dy;

                    if x < 0 || y < 0 || x >= grid.len() as isize || y >= grid[i].len() as isize {
                        found = false;
                        break;
                    }

                    if grid[x as usize][y as usize] != word_chars[k] {
                        found = false;
                        break;
                    }
                }

                if found {
                    count += 1;
                }
            }
        }
    }

    count
}

fn count_x_mas(grid: &Vec<Vec<char>>) -> usize {
    let mut count = 0;
    let word = "MAS";

    // Grid dimensions
    let rows = grid.len();
    let cols = grid[0].len();

    // Check for "X-MAS" pattern
    for i in 1..rows - 1 {
        for j in 1..cols - 1 {
            let tl_br_diagonal = format!("{}{}{}", grid[i - 1][j - 1], grid[i][j], grid[i + 1][j + 1]);
            let tr_bl_diagonal = format!("{}{}{}", grid[i - 1][j + 1], grid[i][j], grid[i + 1][j - 1]);

            if (tl_br_diagonal == word || tl_br_diagonal == word.chars().rev().collect::<String>()) && (tr_bl_diagonal == word || tr_bl_diagonal == word.chars().rev().collect::<String>()) {
                count += 1;
            }
        }
    }
    count
}

pub fn solution_a() {
    // Define the path to the input file
    let input_path = "data/day4.txt";
    
    // Read the grid from the file
    let mut grid = Vec::new();
    if let Ok(lines) = read_lines(input_path) {
        for line in lines {
            if let Ok(row) = line {
                grid.push(row.chars().collect::<Vec<char>>());
            }
        }
    } else {
        println!("Error reading the file.");
    }

    let word = "XMAS";
    let result = count_xmas(&grid, word);

    println!("Solution A: {:?}", result);
}

pub fn solution_b() {
    let input_path = "data/day4.txt";

    // Read the grid from the file
    let mut grid = Vec::new();
    if let Ok(lines) = read_lines(input_path) {
        for line in lines {
            if let Ok(row) = line {
                grid.push(row.chars().collect::<Vec<char>>());
            }
        }
    } else {
        eprintln!("Error reading the file.");
    }

    let result = count_x_mas(&grid);

    println!("Solution B: {:?}", result);
}

// Helper function to read lines from a file
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where
    P: AsRef<Path>,
{
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}

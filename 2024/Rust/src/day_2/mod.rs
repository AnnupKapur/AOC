use std::io::{BufRead, BufReader};
use std::fs::File;

pub fn is_decreasing(line: Vec<i32>) -> bool {
    if line.len() == 1 {
        return true;
    }
    let a = line[0];
    let b = line[1];
    if a-b >= -3 && a-b < 0 {
        return is_decreasing(line[1..].to_vec());
    }
    return false;
}

pub fn is_increasing(line: Vec<i32>) -> bool {
    if line.len() == 1 {
        return true;
    }
    let a = line[0];
    let b = line[1];
    if a-b <= 3 && a-b > 0 {
        return is_increasing(line[1..].to_vec());
    }
    return false;
}

pub fn solution_a () {
    let mut count = 0;

    let reader = BufReader::new(File::open("data/day2.txt").expect("Cannot open file.txt"));

    for line in reader.lines() {
        let line = line.unwrap();
        if line.trim().is_empty() {
            continue;
        }

        let line_nums = line.split(" ").map(|x| x.parse::<i32>().unwrap()).collect::<Vec<i32>>();

        if is_decreasing(line_nums.clone()) || is_increasing(line_nums.clone()) {
            count += 1;
        }
    }

    println!("Solution A: {}", count);
}

pub fn solution_b () {
    let mut count = 0;

    let reader = BufReader::new(File::open("data/day2.txt").expect("Cannot open file.txt"));

    for line in reader.lines() {
        let line = line.unwrap();
        if line.trim().is_empty() {
            continue;
        }

        let line_nums = line.split(" ").map(|x| x.parse::<i32>().unwrap()).collect::<Vec<i32>>();

        if is_decreasing(line_nums.clone()) || is_increasing(line_nums.clone()) {
            count += 1;
            continue;
        }

        for i in 0..line_nums.len() {
            let mut line_nums_clone = line_nums.clone();
            line_nums_clone.remove(i);
            if is_decreasing(line_nums_clone.clone()) || is_increasing(line_nums_clone.clone()) {
                count += 1;
                break;
            }
        }
    }

    println!("Solution B: {}", count);
}

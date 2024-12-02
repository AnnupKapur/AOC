use std::io::{BufRead, BufReader};
use std::fs::File;

pub fn solution_a () {
    let mut left_list = Vec::new();
    let mut right_list = Vec::new();

    let reader = BufReader::new(File::open("data/day1.txt").expect("Cannot open file.txt"));

    for line in reader.lines() {
        let line = line.unwrap();
        if line.trim().is_empty() {
            continue;
        }

        if let Some((left, right)) = line.split_once("   ") {
            left_list.push(left.trim().parse::<i32>().unwrap());
            right_list.push(right.trim().parse::<i32>().unwrap());
        }
    }

    left_list.sort_unstable();
    right_list.sort_unstable();

    let diff: Vec<i32> = left_list
        .iter()
        .zip(right_list.iter())
        .map(|(l, r)| (r - l).abs())
        .collect();

    let sum: i32 = diff.iter().sum();

    println!("{}", sum);

}
